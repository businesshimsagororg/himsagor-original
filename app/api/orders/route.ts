import { NextResponse } from "next/server";
import { getCartTotals, generateOrderId } from "@/lib/commerce";
import { supabase } from "@/lib/db";
import { sendOrderNotifications } from "@/lib/notifications";
import { orderSchema } from "@/lib/order-schema";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = orderSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const order = parsed.data;
  const totals = getCartTotals(order.items, order.zone, order.couponCode);
  const id = generateOrderId();

  if (supabase) {
    const { error } = await supabase.from("orders").insert({
      id,
      customer_name: order.customerName,
      phone: order.phone,
      address: order.address,
      district: order.district,
      zone: order.zone,
      payment_method: order.paymentMethod,
      coupon_code: order.couponCode || null,
      note: order.note || null,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      total: totals.total,
      status: "confirmed"
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const items = order.items.map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return {
        order_id: id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: product?.price || 0
      };
    });

    const { error: itemError } = await supabase.from("order_items").insert(items);
    if (itemError) {
      return NextResponse.json({ error: itemError.message }, { status: 500 });
    }
  }

  await sendOrderNotifications(id, order);

  return NextResponse.json({
    id,
    status: "confirmed",
    paymentMethod: order.paymentMethod,
    totals,
    message: "Order confirmed"
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabase) {
    return NextResponse.json({ orders: [] });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data });
}
