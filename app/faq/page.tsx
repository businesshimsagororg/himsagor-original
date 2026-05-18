import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Himsagor mango delivery, COD, freshness, and return policy."
};

export default function FaqPage() {
  return (
    <section className="section-pad">
      <div className="container-soft">
        <SectionHeading
          eyebrow="FAQ"
          title="সবচেয়ে বেশি করা প্রশ্ন"
          copy="Order করার আগে customer যেগুলো জানতে চান, সব উত্তর এক জায়গায়।"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList />
        </div>
      </div>
    </section>
  );
}
