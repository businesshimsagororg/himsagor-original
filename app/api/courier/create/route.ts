import { NextResponse } from "next/server";
import { createCourierBooking, type CourierPartner } from "@/lib/integrations";
import { supabase } from "@/lib/db";
import { findMemoryOrder, updateMemoryOrder } from "@/lib/memory-store";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId, partner } = (await request.json()) as {
    orderId?: string;
    partner?: CourierPartner;
  };

  if (!orderId || !partner) {
    return NextResponse.json(
      { error: "Order ID and courier partner are required" },
      { status: 400 }
    );
  }

  let order = null;
  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    order = data;
  } else {
    order = findMemoryOrder(orderId) || null;
  }

  const booking = await createCourierBooking({
    partner,
    orderId,
    order: {
      customerName: order?.customer_name || "Customer",
      phone: order?.phone || "",
      district: order?.district || "",
      thana: order?.thana || "",
      villageRoad: order?.village_road || "",
      address: order?.address || "",
      total: order?.total || 0
    }
  });

  if (supabase) {
    await supabase
      .from("orders")
      .update({
        status: "shipped",
        courier_partner: partner,
        tracking_number: booking.trackingNumber
      })
      .eq("id", orderId);
  } else {
    updateMemoryOrder(orderId, {
      status: "shipped",
      courier_partner: partner,
      tracking_number: booking.trackingNumber
    });
  }

  return NextResponse.json({ ok: true, booking });
}
