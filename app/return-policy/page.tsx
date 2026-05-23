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
        ["Unboxing Video", "Delivery damage, rotten fruit, or wrong package complaints need a clear unboxing video from the moment the package is opened."],
        ["Complaint Window", "Please contact us within 12 hours of delivery with order ID, phone number, photos, and video proof."],
        ["Resolution", "After review, we may offer replacement, partial refund, coupon, or courier claim support depending on the issue."],
        ["Freshness Care", "Keep mangoes in a dry, ventilated place. Refrigerate ripe mangoes to slow further ripening."],
        ["Before You Claim", "Taste preference or storage damage after delivery may not qualify for compensation, but our support team will still guide you."]
      ]}
    />
  );
}
