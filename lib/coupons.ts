export type Coupon = {
  label: string;
  type: "flat" | "percent";
  value: number;
};

export type CouponMap = Record<string, Coupon>;

export function getCoupons(): CouponMap {
  const raw = process.env.NEXT_PUBLIC_COUPONS_JSON || "{}";

  try {
    const parsed = JSON.parse(raw) as CouponMap;
    return Object.fromEntries(
      Object.entries(parsed).map(([code, coupon]) => [
        code.toUpperCase(),
        {
          label: coupon.label,
          type: coupon.type,
          value: Number(coupon.value)
        }
      ])
    );
  } catch {
    return {};
  }
}
