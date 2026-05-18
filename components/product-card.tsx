"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";
import { formatTk } from "@/lib/commerce";
import type { ProductPackage } from "@/lib/products";
import { useCart } from "@/components/cart-provider";

export function ProductCard({ product }: { product: ProductPackage }) {
  const { addItem } = useCart();
  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  return (
    <article className="group overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/10">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.banglaName}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute left-3 top-3 rounded-full bg-mango-500 px-3 py-1 text-xs font-black text-ink">
          {product.badge}
        </div>
        {discount ? (
          <div className="absolute right-3 top-3 rounded-full bg-leaf-700 px-3 py-1 text-xs font-black text-white">
            {discount}% OFF
          </div>
        ) : null}
      </Link>
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black">{product.banglaName}</h3>
            <p className="text-sm text-ink/60 dark:text-cream/60">
              {product.weightKg} KG | {product.packaging}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-black">{formatTk(product.price)}</p>
            {product.compareAt ? (
              <p className="text-sm text-ink/40 line-through dark:text-cream/40">
                {formatTk(product.compareAt)}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-mango-100">
          <div
            className="h-full rounded-full bg-leaf-500"
            style={{ width: `${Math.max(16, Math.min(product.stock * 2, 100))}%` }}
          />
        </div>
        <p className="mb-4 text-sm font-semibold text-leaf-700 dark:text-mango-300">
          Only {product.stock} boxes in current harvest batch
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => addItem(product.id)}
            className="flex items-center justify-center gap-2 rounded-lg border border-black/10 px-3 py-3 text-sm font-black transition hover:bg-mango-100 dark:border-white/10 dark:hover:bg-white/10"
          >
            <ShoppingCart size={17} /> Cart
          </button>
          <button
            type="button"
            onClick={() => addItem(product.id)}
            className="flex items-center justify-center gap-2 rounded-lg bg-ink px-3 py-3 text-sm font-black text-white transition hover:bg-leaf-700 dark:bg-mango-500 dark:text-ink"
          >
            <Zap size={17} /> Buy
          </button>
        </div>
      </div>
    </article>
  );
}
