"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/faqs";

export function FaqList({ limit }: { limit?: number }) {
  const [active, setActive] = useState(0);
  const list = typeof limit === "number" ? faqs.slice(0, limit) : faqs;

  return (
    <div className="grid gap-3">
      {list.map((faq, index) => (
        <div
          key={faq.question}
          className="rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-white/10"
        >
          <button
            type="button"
            onClick={() => setActive(active === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-black"
          >
            {faq.question}
            <ChevronDown
              size={18}
              className={`shrink-0 transition ${active === index ? "rotate-180" : ""}`}
            />
          </button>
          {active === index ? (
            <p className="px-5 pb-5 leading-8 text-ink/70 dark:text-cream/70">
              {faq.answer}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
