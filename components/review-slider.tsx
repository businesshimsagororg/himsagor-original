import { Star } from "lucide-react";
import { reviews } from "@/lib/reviews";

export function ReviewSlider() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {reviews.map((review) => (
        <div
          key={`${review.name}-${review.tag}`}
          className="rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/10"
        >
          <div className="mb-3 flex text-mango-500">
            {Array.from({ length: review.rating }).map((_, starIndex) => (
              <Star key={starIndex} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="leading-7 text-ink/75 dark:text-cream/75">
            {review.text}
          </p>
          <div className="mt-4">
            <p className="font-black">{review.name}</p>
            <p className="text-sm text-ink/60 dark:text-cream/60">
              {review.location} | {review.tag} | {review.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
