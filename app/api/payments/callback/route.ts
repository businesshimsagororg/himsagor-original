import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const status = searchParams.get("status") || "paid";

  if (!orderId) {
    return NextResponse.redirect(new URL("/shop", request.url));
  }

  if (supabase && status === "paid") {
    await supabase
      .from("orders")
      .update({ payment_status: "paid", status: "confirmed" })
      .eq("id", orderId);
  }

  return NextResponse.redirect(
    new URL(`/order-success?orderId=${orderId}&payment=${status}`, request.url)
  );
}
