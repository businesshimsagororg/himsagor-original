import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Himsagor Original."
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        ["Information We Collect", "Order name, phone, delivery address, payment preference, and support messages are collected to process mango orders."],
        ["How We Use Data", "We use customer information for order confirmation, delivery, support, complaint review, analytics, and service improvement."],
        ["Payments", "COD requires no advance payment. bKash/Nagad details are used only for transaction support and reconciliation."],
        ["Analytics", "Google Analytics and Facebook Pixel may be enabled through environment variables to measure campaign performance."],
        ["Retention", "Order data is retained for accounting, delivery, fraud prevention, and customer service purposes."]
      ]}
    />
  );
}
