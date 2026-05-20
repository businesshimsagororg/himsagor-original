import { siteUrl } from "@/lib/constants";
import type { OrderInput } from "@/lib/order-schema";

export type PaymentProvider = "bkash_gateway" | "nagad_gateway";
export type CourierPartner = "pathao" | "steadfast" | "redx";
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

export async function createPaymentSession({
  provider,
  orderId,
  amount,
  callbackBaseUrl
}: {
  provider: PaymentProvider;
  orderId: string;
  amount: number;
  callbackBaseUrl?: string;
}) {
  const baseUrl =
    provider === "bkash_gateway"
      ? process.env.BKASH_CHECKOUT_URL
      : process.env.NAGAD_CHECKOUT_URL;

  if (!baseUrl) {
    return {
      provider,
      demo: true,
      paymentUrl: `${callbackBaseUrl || siteUrl}/order-success?orderId=${orderId}&total=${amount}&payment=manual-setup-required`
    };
  }

  return {
    provider,
    demo: false,
    paymentUrl: `${baseUrl}?orderId=${encodeURIComponent(orderId)}&amount=${amount}&callback=${encodeURIComponent(`${callbackBaseUrl || siteUrl}/api/payments/callback`)}`
  };
}

export async function createCourierBooking({
  partner,
  orderId,
  order
}: {
  partner: CourierPartner;
  orderId: string;
  order: Partial<OrderInput> & { total?: number };
}) {
  const endpoint = {
    pathao: process.env.PATHAO_COURIER_API_URL,
    steadfast: process.env.STEADFAST_COURIER_API_URL,
    redx: process.env.REDX_COURIER_API_URL
  }[partner];

  const apiKey = {
    pathao: process.env.PATHAO_COURIER_API_KEY,
    steadfast: process.env.STEADFAST_COURIER_API_KEY,
    redx: process.env.REDX_COURIER_API_KEY
  }[partner];

  if (!endpoint || !apiKey) {
    return {
      partner,
      trackingNumber: `${partner.toUpperCase()}-${orderId}`,
      demo: true,
      message: "Courier credentials not configured. Demo tracking number generated."
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      merchant_order_id: orderId,
      recipient_name: order.customerName,
      recipient_phone: order.phone,
      recipient_address: `${order.address}, ${order.villageRoad}, ${order.thana}, ${order.district}`,
      cod_amount: order.total || 0
    })
  });

  if (!response.ok) {
    throw new Error(`Courier booking failed for ${partner}`);
  }

  const data = await response.json();
  return {
    partner,
    trackingNumber:
      data.tracking_number || data.consignment_id || data.id || `${partner.toUpperCase()}-${orderId}`,
    demo: false,
    response: data
  };
}
