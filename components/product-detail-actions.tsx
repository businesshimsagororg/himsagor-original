"use client";

import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { PaymentBadges } from "@/components/payment-badges";

export function ProductDetailActions({ productId }: { productId: string }) {
  const { addItem } = useCart();

  return (
    <div className="sticky bottom-16 z-20 mt-8 rounded-lg bg-cream/90 p-3 shadow-soft backdrop-blur md:static md:bg-transparent md:p-0 md:shadow-none dark:bg-leaf-900/90">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => addItem(productId)}
          className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-5 py-4 font-black dark:border-white/10 dark:bg-white/10"
        >
          <ShoppingCart size={18} /> কার্টে নিন
        </button>
        <Link
          href="/checkout"
          onClick={() => addItem(productId)}
          className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-mango-500 px-5 py-4 font-black text-ink transition hover:bg-mango-300"
        >
          <Zap size={18} /> অর্ডার করুন
        </Link>
      </div>
      <div className="mt-3 hidden md:block">
        <PaymentBadges compact />
      </div>
    </div>
  );
}
