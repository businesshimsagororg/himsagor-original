import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for Himsagor Original."
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      sections={[
        ["Orders", "Orders are confirmed after customer details are submitted and our team verifies delivery feasibility."],
        ["Pricing", "Seasonal mango prices can change based on harvest supply, courier cost, and packaging availability."],
        ["Delivery", "Pan Bangladesh delivery is offered through courier partners. Delivery timing may vary by route and season pressure."],
        ["Payment", "Cash on Delivery is available. bKash and Nagad may be used when the customer prefers digital payment."],
        ["Complaint Requirement", "Unboxing video is mandatory for delivery damage, missing item, or quality complaints."],
        ["Website Use", "Do not misuse forms, submit false orders, or attempt unauthorized access to admin systems."]
      ]}
    />
  );
}
