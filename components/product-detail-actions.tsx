"use client";

import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function ProductDetailActions({ productId }: { productId: string }) {
  const { addItem } = useCart();

  return (
    <div className="sticky bottom-16 z-20 mt-8 grid grid-cols-2 gap-3 rounded-lg bg-cream/90 p-3 shadow-soft backdrop-blur md:static md:bg-transparent md:p-0 md:shadow-none dark:bg-leaf-900/90">
      <button
        onClick={() => addItem(productId)}
        className="flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-5 py-4 font-black dark:border-white/10 dark:bg-white/10"
      >
        <ShoppingCart size={18} /> Add to Cart
      </button>
      <Link
        href="/checkout"
        onClick={() => addItem(productId)}
        className="flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-4 font-black text-white dark:bg-mango-500 dark:text-ink"
      >
        <Zap size={18} /> Buy Now
      </Link>
    </div>
  );
}
