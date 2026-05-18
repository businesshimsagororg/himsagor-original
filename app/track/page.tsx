import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { TrackOrderForm } from "@/components/track-order-form";

export const metadata: Metadata = {
  title: "Order Tracking",
  description: "Track your Himsagor Original mango order status."
};

export default function TrackPage() {
  return (
    <section className="section-pad">
      <div className="container-soft">
        <SectionHeading
          eyebrow="Tracking"
          title="আপনার order status দেখুন"
          copy="Order ID এবং phone number দিয়ে delivery progress check করুন।"
        />
        <div className="mt-10">
          <TrackOrderForm />
        </div>
      </div>
    </section>
  );
}
