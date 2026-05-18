import type { Metadata } from "next";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { reviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Customer reviews for Himsagor Original mango orders."
};

export default function ReviewsPage() {
  return (
    <section className="section-pad">
      <div className="container-soft">
        <SectionHeading
          eyebrow="Reviews"
          title="Customer love from across Bangladesh"
          copy="নতুন buyer-এর confidence বাড়ানোর জন্য review-first presentation."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-lg bg-white p-6 shadow-sm dark:bg-white/10">
              <div className="mb-4 flex text-mango-500">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg leading-8 text-ink/75 dark:text-cream/75">“{review.text}”</p>
              <p className="mt-5 font-black">{review.name}</p>
              <p className="text-sm text-ink/60 dark:text-cream/60">{review.location} | {review.tag}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
