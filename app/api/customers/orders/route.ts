import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { listMemoryOrders } from "@/lib/memory-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");

  if (!phone) {
    return NextResponse.json({ error: "Phone is required" }, { status: 400 });
  }

  if (!supabase) {
    return NextResponse.json({
      orders: listMemoryOrders().filter((order) => order.phone === phone)
    });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("phone", phone)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data });
}
