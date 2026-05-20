"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { estimateDelivery, formatTk } from "@/lib/commerce";
import { products } from "@/lib/products";
import { useCart } from "@/components/cart-provider";

export function CheckoutForm() {
  const router = useRouter();
  const {
    items,
    hydrated,
    totals,
    couponCode,
    clearCart,
    setOpen
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace("/shop?cart=required");
    }
  }, [hydrated, items.length, router]);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      customerName: String(form.get("customerName")),
      phone: String(form.get("phone")),
      district: String(form.get("district")),
      thana: String(form.get("thana")),
      villageRoad: String(form.get("villageRoad")),
      address: String(form.get("address")),
      zone: "bangladesh",
      paymentMethod: String(form.get("paymentMethod")),
      couponCode,
      note: String(form.get("note") || ""),
      items
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Order failed. Please try again.");
      return;
    }

    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
      return;
    }

    clearCart();
    setOpen(false);
    router.push(`/order-success?orderId=${data.id}&total=${data.totals.total}`);
  }

  return (
    <form onSubmit={submitOrder} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-lg bg-white p-5 shadow-sm dark:bg-white/10">
        <h1 className="mb-2 text-3xl font-black">Checkout</h1>
        <p className="mb-6 text-ink/70 dark:text-cream/70">
          Cash on Delivery available. কোনো advance payment লাগবে না।
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <Field name="customerName" label="Full Name" placeholder="আপনার নাম" />
          <Field name="phone" label="Phone" placeholder="01577428064" />
          <Field name="district" label="District" placeholder="জেলা" />
          <Field name="thana" label="Thana / Upazila" placeholder="থানা / উপজেলা" />
          <Field name="villageRoad" label="Village / Road" placeholder="গ্রাম / রোড" />
        </div>
        <label className="mt-4 grid gap-2 text-sm font-bold">
          Specific Address
          <textarea
            name="address"
            required
            rows={4}
            placeholder="বাড়ি নম্বর, landmark, floor, bazar, union বা অন্য detail"
            className="rounded-lg border border-black/10 bg-cream px-3 py-3 outline-none dark:border-white/10 dark:bg-white/10"
          />
        </label>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            ["cod", "Cash on Delivery"],
            ["bkash_gateway", "Pay Online bKash"],
            ["nagad_gateway", "Pay Online Nagad"]
          ].map(([value, label]) => (
            <label
              key={value}
              className="rounded-lg border border-black/10 bg-cream p-3 text-sm font-bold dark:border-white/10 dark:bg-white/10"
            >
              <input
                defaultChecked={value === "cod"}
                className="mr-2"
                type="radio"
                name="paymentMethod"
                value={value}
              />
              {label}
            </label>
          ))}
        </div>
        <label className="mt-4 grid gap-2 text-sm font-bold">
          Order Note
          <textarea
            name="note"
            rows={3}
            placeholder="Gift note, preferred delivery time, or instructions"
            className="rounded-lg border border-black/10 bg-cream px-3 py-3 outline-none dark:border-white/10 dark:bg-white/10"
          />
        </label>
        <p className="mt-4 rounded-lg bg-mango-100 p-4 text-sm font-bold text-ink">
          Complaint support-এর জন্য unboxing video mandatory.
        </p>
        {error ? <p className="mt-4 text-sm font-bold text-red-600">{error}</p> : null}
      </div>

      <aside className="h-fit rounded-lg bg-ink p-5 text-white shadow-soft dark:bg-black">
        <h2 className="text-2xl font-black">Order Summary</h2>
        <div className="mt-5 grid gap-4">
          {items.length ? (
            items.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <div key={item.productId} className="flex justify-between gap-4 text-sm">
                  <span>
                    {product.banglaName} x {item.quantity}
                  </span>
                  <span>{formatTk(product.price * item.quantity)}</span>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-white/70">Cart empty. Please add a package.</p>
          )}
        </div>
        <div className="mt-6 grid gap-2 border-t border-white/10 pt-5 text-sm">
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
          <div className="flex justify-between text-lg font-black">
            <span>Total</span>
            <span>{formatTk(totals.total)}</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/70">
          Estimated delivery: {estimateDelivery()} | Flat delivery charge across Bangladesh
        </p>
        <button
          disabled={loading || !items.length}
          className="mt-5 w-full rounded-lg bg-mango-500 px-4 py-3 font-black text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Confirming..." : "Confirm Order"}
        </button>
      </aside>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder
}: {
  name: string;
  label: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input
        required
        name={name}
        placeholder={placeholder}
        className="rounded-lg border border-black/10 bg-cream px-3 py-3 outline-none dark:border-white/10 dark:bg-white/10"
      />
    </label>
  );
}
