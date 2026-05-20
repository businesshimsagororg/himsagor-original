import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/db";

const customerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal(""))
});

export async function POST(request: Request) {
  const parsed = customerSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid customer data" }, { status: 400 });
  }

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      demo: true,
      customer: parsed.data
    });
  }

  const { data, error } = await supabase
    .from("customers")
    .upsert(
      {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null
      },
      { onConflict: "phone" }
    )
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, customer: data });
}
