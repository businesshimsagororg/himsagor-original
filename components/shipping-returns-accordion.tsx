"use client";

import { ChevronDown, PackageCheck, RotateCcw, Truck } from "lucide-react";
import { useState } from "react";

const items = [
  {
    title: "Shipping timeline",
    icon: Truck,
    copy: "ঢাকা ও ঢাকার বাইরে একই flat delivery logic. সাধারণত ১-৪ কর্মদিবসের মধ্যে dispatch route অনুযায়ী delivery হয়."
  },
  {
    title: "Freshness guarantee",
    icon: PackageCheck,
    copy: "প্রতিটি box packing-এর আগে visual grading করা হয়. Ventilated carton ব্যবহার করা হয় যাতে আম travel-friendly থাকে."
  },
  {
    title: "Damage or return claim",
    icon: RotateCcw,
    copy: "Delivery damage বা rotten claim-এর জন্য package খোলার সময় clear unboxing video mandatory. Delivery-এর ১২ ঘণ্টার মধ্যে জানাতে হবে."
  }
];

export function ShippingReturnsAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-6 rounded-lg border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/10">
      {items.map((item, index) => {
        const Icon = item.icon;
        const open = active === index;

        return (
          <div key={item.title} className="border-b border-black/10 last:border-b-0 dark:border-white/10">
            <button
              type="button"
              onClick={() => setActive(open ? -1 : index)}
              className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left font-black"
            >
              <span className="flex items-center gap-2">
                <Icon className="text-leaf-700 dark:text-mango-300" size={18} />
                {item.title}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 transition ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open ? (
              <p className="px-4 pb-4 leading-7 text-ink/70 dark:text-cream/70">
                {item.copy}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

