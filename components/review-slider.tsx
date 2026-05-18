"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { reviews } from "@/lib/reviews";

export function ReviewSlider() {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {[...reviews, ...reviews].map((review, index) => (
          <div
            key={`${review.name}-${index}`}
            className="w-[300px] shrink-0 rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/10"
          >
            <div className="mb-3 flex text-mango-500">
              {Array.from({ length: review.rating }).map((_, starIndex) => (
                <Star key={starIndex} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="leading-7 text-ink/75 dark:text-cream/75">
              â€œ{review.text}â€
            </p>
            <div className="mt-4">
              <p className="font-black">{review.name}</p>
              <p className="text-sm text-ink/60 dark:text-cream/60">
                {review.location} | {review.tag}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
