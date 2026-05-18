import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  message: z.string().min(5)
});

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact form" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks. Our team will contact you shortly."
  });
}
