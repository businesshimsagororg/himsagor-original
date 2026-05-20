"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { formatTk } from "@/lib/commerce";
import { useCart, useCartProducts } from "@/components/cart-provider";

export function CartDrawer() {
  const {
    isOpen,
    setOpen,
    updateQuantity,
    removeItem,
    totals,
    couponCode,
    setCouponCode
  } = useCart();
  const cartProducts = useCartProducts();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        aria-label="Close cart overlay"
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-cream p-5 shadow-soft dark:bg-leaf-900">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xl font-black">আপনার Cart</p>
            <p className="text-sm text-ink/60 dark:text-cream/70">
              COD available, no advance payment
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-white/10"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-4">
          {cartProducts.length ? (
            cartProducts.map(({ product, quantity, productId }) =>
              product ? (
                <div
                  key={productId}
                  className="grid grid-cols-[86px_1fr] gap-3 rounded-lg bg-white p-3 shadow-sm dark:bg-white/10"
                >
                  <div className="relative h-24 overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="86px"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between gap-2">
                      <p className="font-bold">{product.banglaName}</p>
                      <button
                        type="button"
                        onClick={() => removeItem(productId)}
                        className="text-ink/40 dark:text-cream/40"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-ink/60 dark:text-cream/70">
                      {formatTk(product.price)}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(productId, quantity - 1)}
                        className="grid h-8 w-8 place-items-center rounded-full bg-mango-100 text-ink"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(productId, quantity + 1)}
                        className="grid h-8 w-8 place-items-center rounded-full bg-mango-500 text-ink"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )
          ) : (
            <div className="rounded-lg bg-white p-6 text-center dark:bg-white/10">
              <p className="font-bold">Cart empty</p>
              <p className="mt-1 text-sm text-ink/60 dark:text-cream/70">
                Shop page থেকে প্যাকেজ নির্বাচন করুন।
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-lg bg-white p-4 dark:bg-white/10">
          <p className="text-sm font-bold">Flat Bangladesh Delivery</p>
          <p className="mt-1 text-xs text-ink/60 dark:text-cream/60">
            Same delivery logic for Dhaka and outside Dhaka. Free shipping over ৳2,500.
          </p>
          <input
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            placeholder="Coupon code: HIMSA100"
            className="mt-3 w-full rounded-lg border border-black/10 bg-cream px-3 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/10"
          />
          <div className="mt-4 grid gap-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatTk(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-{formatTk(totals.discount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatTk(totals.shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-3 text-lg font-black dark:border-white/10">
              <span>Total</span>
              <span>{formatTk(totals.total)}</span>
            </div>
          </div>
          <Link
            href={cartProducts.length ? "/checkout" : "/shop?cart=required"}
            onClick={() => setOpen(false)}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-ink px-4 py-3 font-black text-white dark:bg-mango-500 dark:text-ink"
          >
            {cartProducts.length ? "Checkout" : "Add Product First"}
          </Link>
        </div>
      </aside>
    </div>
  );
}
