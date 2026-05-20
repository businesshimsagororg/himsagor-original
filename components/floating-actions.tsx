"use client";

import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { brand } from "@/lib/constants";
import { useCart } from "@/components/cart-provider";

export function FloatingActions() {
  const { count, setOpen } = useCart();

  return (
    <>
      <a
        href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent("আমি Himsagor Original থেকে আম অর্ডার করতে চাই")}`}
        className="fixed bottom-24 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-leaf-500 text-white shadow-soft transition hover:scale-105"
        aria-label="WhatsApp chat"
      >
        <MessageCircle size={22} />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/90 p-3 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-leaf-900/90">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-black text-white dark:bg-mango-500 dark:text-ink"
          >
            <ShoppingBag size={18} /> Cart {count ? `(${count})` : ""}
          </button>
          <Link
            href={count ? "/checkout" : "/shop?cart=required"}
            className="flex flex-1 items-center justify-center rounded-lg bg-mango-500 px-4 py-3 text-sm font-black text-ink"
          >
            {count ? "Order Now" : "Add Product"}
          </Link>
        </div>
      </div>
    </>
  );
}
