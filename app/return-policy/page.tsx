import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "Return and complaint policy for Himsagor Original mango orders."
};

export default function ReturnPolicyPage() {
  return (
    <LegalPage
      title="Return Policy"
      sections={[
        ["Mandatory Unboxing Video", "Delivery damage, rotten fruit, or wrong package complaints require a clear unboxing video from the moment the package is opened."],
        ["Complaint Window", "Customers must contact us within 12 hours of receiving delivery with order ID, phone number, photos, and video proof."],
        ["Resolution", "Depending on evidence and issue type, we may offer replacement, partial refund, coupon, or courier claim support."],
        ["Not Eligible", "Taste preference, delayed storage, heat exposure after delivery, or complaints without unboxing video are not eligible for guaranteed compensation."],
        ["Freshness Care", "Keep mangoes in a dry, ventilated place. Refrigerate ripe mangoes to slow further ripening."]
      ]}
    />
  );
}
