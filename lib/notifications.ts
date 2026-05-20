import { brand } from "@/lib/constants";
import type { OrderInput } from "@/lib/order-schema";

export async function sendOrderNotifications(orderId: string, order: OrderInput) {
  const smsUrl = process.env.SMS_PROVIDER_URL;
  const smsKey = process.env.SMS_API_KEY;

  if (smsUrl && smsKey) {
    await fetch(smsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${smsKey}`
      },
      body: JSON.stringify({
        to: order.phone,
        message: `${brand.name}: আপনার অর্ডার ${orderId} confirm হয়েছে. Hotline ${brand.phone}`
      })
    }).catch(() => undefined);

    if (process.env.ADMIN_SMS_NUMBER) {
      await fetch(smsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${smsKey}`
        },
        body: JSON.stringify({
          to: process.env.ADMIN_SMS_NUMBER,
          message: `New ${brand.name} order ${orderId}. Customer: ${order.customerName}, ${order.phone}.`
        })
      }).catch(() => undefined);
    }
  }

  // Email providers differ by vendor; keep this hook centralized for Resend,
  // SendGrid, or transactional SMTP adapters in production.
  return { smsAttempted: Boolean(smsUrl && smsKey) };
}
