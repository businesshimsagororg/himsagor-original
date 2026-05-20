import { products } from "@/lib/products";
import { getCoupons } from "@/lib/coupons";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type ShippingZone = "bangladesh";

export const flatShippingFee = 120;


export function formatTk(amount: number) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function getCartTotals(items: CartItem[], couponCode?: string) {
  const subtotal = items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const coupons = getCoupons();
  const coupon = couponCode ? coupons[couponCode.toUpperCase()] : undefined;
  const discount = coupon
    ? coupon.type === "flat"
      ? coupon.value
      : Math.round((subtotal * coupon.value) / 100)
    : 0;
  const shipping = subtotal === 0 ? 0 : subtotal > 2500 ? 0 : flatShippingFee;
  const total = Math.max(subtotal - discount, 0) + shipping;

  return { subtotal, discount, shipping, total, coupon };
}

export function estimateDelivery() {
  return "১-৪ কর্মদিবস";
}

export function generateOrderId() {
  const date = new Date();
  const stamp = date
    .toISOString()
    .slice(2, 10)
    .replaceAll("-", "");
  return `HIM-${stamp}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}
