import { NextResponse } from "next/server";
import { getCartTotals, generateOrderId } from "@/lib/commerce";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { supabase } from "@/lib/db";
import { createPaymentSession } from "@/lib/integrations";
import { decrementStock } from "@/lib/inventory";
import { listMemoryOrders, saveMemoryOrder, updateMemoryOrder } from "@/lib/memory-store";
import { rateLimit } from "@/lib/rate-limit";
import { sendOrderNotifications } from "@/lib/notifications";
import { orderSchema } from "@/lib/order-schema";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  const limit = rateLimit(request, "orders:create");
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many order attempts. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000))
        }
      }
    );
  }

  const json = await request.json();
  const parsed = orderSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const order = parsed.data;
  const invalidItem = order.items.find(
    (item) => !products.some((product) => product.id === item.productId)
  );

  if (invalidItem) {
    return NextResponse.json({ error: "Invalid product in order" }, { status: 400 });
  }

  if (!supabase && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Order database is not configured. Set Supabase before launch." },
      { status: 503 }
    );
  }

  const totals = getCartTotals(order.items, order.couponCode);
  const id = generateOrderId();
  const paymentStatus = order.paymentMethod === "cod" ? "cod_pending" : "payment_pending";

  if (supabase) {
    const { error } = await supabase.from("orders").insert({
      id,
      customer_name: order.customerName,
      phone: order.phone,
      address: order.address,
      district: order.district,
      thana: order.thana,
      village_road: order.villageRoad,
      zone: order.zone,
      payment_method: order.paymentMethod,
      payment_status: paymentStatus,
      coupon_code: order.couponCode || null,
      note: order.note || null,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      total: totals.total,
      status: "pending"
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

    const stockUpdate = await decrementStock(order.items);
    if (!stockUpdate.ok) {
      await supabase.from("orders").delete().eq("id", id);
      return NextResponse.json(
        {
          error: "One or more products are out of stock",
          productId: stockUpdate.product_id
        },
        { status: 409 }
      );
    }
  } else {
    const stockUpdate = await decrementStock(order.items);
    if (!stockUpdate.ok) {
      return NextResponse.json(
        {
          error: "One or more products are out of stock",
          productId: stockUpdate.product_id
        },
        { status: 409 }
      );
    }

    saveMemoryOrder({
      id,
      customer_name: order.customerName,
      phone: order.phone,
      address: order.address,
      district: order.district,
      thana: order.thana,
      village_road: order.villageRoad,
      zone: order.zone,
      payment_method: order.paymentMethod,
      payment_status: paymentStatus,
      coupon_code: order.couponCode || null,
      note: order.note || null,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      total: totals.total,
      status: "pending",
      created_at: new Date().toISOString(),
      order_items: order.items
    });
  }

  await sendOrderNotifications(id, order);

  const payment =
    order.paymentMethod === "cod"
      ? null
      : await createPaymentSession({
          provider: order.paymentMethod,
          orderId: id,
          amount: totals.total,
          callbackBaseUrl: new URL(request.url).origin
        });

  return NextResponse.json({
    id,
    status: "pending",
    paymentMethod: order.paymentMethod,
    paymentStatus,
    paymentUrl: payment?.paymentUrl,
    totals,
    message: "Order confirmed"
  });
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!isAdminAuthorized(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { orderId, status, courierPartner, trackingNumber } = body;

  if (!orderId) {
    return NextResponse.json({ error: "Order ID required" }, { status: 400 });
  }

  if (!supabase) {
    const order = updateMemoryOrder(orderId, {
      status,
      courier_partner: courierPartner,
      tracking_number: trackingNumber
    });
    return NextResponse.json({
      ok: true,
      demo: true,
      order
    });
  }

  const updates: Record<string, string> = {};
  if (status) updates.status = status;
  if (courierPartner) updates.courier_partner = courierPartner;
  if (trackingNumber) updates.tracking_number = trackingNumber;

  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", orderId)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, order: data });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!isAdminAuthorized(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabase) {
    return NextResponse.json({ orders: listMemoryOrders() });
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
