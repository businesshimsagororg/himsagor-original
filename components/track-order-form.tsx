"use client";

import { FormEvent, useState } from "react";

export function TrackOrderForm() {
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const orderId = String(form.get("orderId"));
    const phone = String(form.get("phone"));
    const response = await fetch(
      `/api/orders/track?orderId=${encodeURIComponent(orderId)}&phone=${encodeURIComponent(phone)}`
    );
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(data.error || "Order not found");
      setResult(null);
      return;
    }
    setResult(data.order);
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-5 shadow-soft dark:bg-white/10">
      <form onSubmit={submit} className="grid gap-4">
        <label className="grid gap-2 text-sm font-bold">
          Order ID
          <input
            name="orderId"
            required
            placeholder="HIM-260517-ABCDE"
            className="rounded-lg border border-black/10 bg-cream px-3 py-3 outline-none dark:border-white/10 dark:bg-white/10"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Phone
          <input
            name="phone"
            required
            placeholder="01577428064"
            className="rounded-lg border border-black/10 bg-cream px-3 py-3 outline-none dark:border-white/10 dark:bg-white/10"
          />
        </label>
        <button className="rounded-lg bg-ink px-4 py-3 font-black text-white dark:bg-mango-500 dark:text-ink">
          {loading ? "Checking..." : "Track Order"}
        </button>
      </form>
      {error ? <p className="mt-4 text-sm font-bold text-red-600">{error}</p> : null}
      {result ? (
        <div className="mt-5 rounded-lg bg-mango-100 p-4 text-ink">
          <p className="font-black">Status: {result.status}</p>
          <p className="mt-1 text-sm">{result.message || "Your order is being processed."}</p>
        </div>
      ) : null}
    </div>
  );
}
