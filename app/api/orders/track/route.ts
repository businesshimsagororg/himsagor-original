import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { findMemoryOrder } from "@/lib/memory-store";

const demoStatuses = ["pending", "confirmed", "shipped", "delivered"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const phone = searchParams.get("phone");

  if (!orderId || !phone) {
    return NextResponse.json(
      { error: "Order ID and phone are required" },
      { status: 400 }
    );
  }

  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("phone", phone)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order: data });
  }

  const memoryOrder = findMemoryOrder(orderId, phone);
  if (memoryOrder) {
    return NextResponse.json({ order: memoryOrder });
  }

  return NextResponse.json({
    order: {
      id: orderId,
      phone,
      status: demoStatuses[orderId.length % demoStatuses.length],
      message: "Demo tracking response. Connect Supabase to show live order status."
    }
  });
}
