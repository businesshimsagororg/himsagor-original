"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { ProductPackage } from "@/lib/products";

const filters = [
  { label: "সব", value: "all" },
  { label: "পরিবার", value: "family" },
  { label: "Gift", value: "gift" },
  { label: "Bulk", value: "bulk" }
];

export function ShopProductGrid({ products }: { products: ProductPackage[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const searchable = [
        product.name,
        product.banglaName,
        product.badge,
        product.shortDescription,
        product.description,
        ...product.bestFor
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery ? searchable.includes(normalizedQuery) : true;
      const matchesFilter =
        filter === "all" ||
        (filter === "family" && searchable.includes("famil")) ||
        (filter === "gift" && searchable.includes("gift")) ||
        (filter === "bulk" && searchable.includes("bulk"));

      return matchesQuery && matchesFilter;
    });
  }, [filter, products, query]);

  return (
    <div className="mt-10">
      <div className="grid gap-3 rounded-lg border border-black/10 bg-white/80 p-3 shadow-sm md:grid-cols-[1fr_auto] dark:border-white/10 dark:bg-white/10">
        <label className="relative block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-cream/45" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="প্যাকেজ, kg, gift বা family খুঁজুন"
            className="min-h-12 w-full rounded-lg border border-black/10 bg-cream pl-10 pr-3 font-semibold outline-none transition focus:border-leaf-500 dark:border-white/10 dark:bg-white/10"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 px-2 text-sm font-black text-ink/60 dark:text-cream/60">
            <SlidersHorizontal size={16} /> Filter
          </span>
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`min-h-10 rounded-lg px-4 text-sm font-black transition ${
                filter === item.value
                  ? "bg-mango-500 text-ink shadow-sm"
                  : "border border-black/10 bg-white text-ink/70 hover:border-leaf-500 dark:border-white/10 dark:bg-white/10 dark:text-cream/75"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-lg bg-white p-8 text-center shadow-sm dark:bg-white/10">
          <p className="text-xl font-black">এই search অনুযায়ী package পাওয়া যায়নি</p>
          <p className="mt-2 text-ink/65 dark:text-cream/65">
            অন্য keyword চেষ্টা করুন অথবা phone/WhatsApp-এ custom order দিন।
          </p>
        </div>
      )}
    </div>
  );
}
