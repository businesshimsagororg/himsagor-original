"use client";

import { FormEvent, useState } from "react";

export function AccountPanel() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState<Array<Record<string, string | number>>>([]);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email")
      })
    });
    setMessage(response.ok ? "Account saved. You can now check order history." : "Unable to save account.");
  }

  async function loadOrders() {
    if (!phone.trim()) {
      setMessage("Order history দেখতে mobile number লিখুন।");
      return;
    }
    const response = await fetch(`/api/customers/orders?phone=${encodeURIComponent(phone)}`);
    const data = await response.json();
    setOrders(data.orders || []);
    setMessage(data.orders?.length ? "Order history loaded." : "No orders found for this phone.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={saveProfile} className="rounded-lg bg-white p-5 shadow-sm dark:bg-white/10">
        <h2 className="text-2xl font-black">Customer registration</h2>
        <div className="mt-5 grid gap-3">
          <input name="name" required placeholder="আপনার নাম" className="rounded-lg border border-black/10 bg-cream px-3 py-3 dark:border-white/10 dark:bg-white/10" />
          <input name="phone" required type="tel" inputMode="tel" placeholder="মোবাইল নম্বর" className="rounded-lg border border-black/10 bg-cream px-3 py-3 dark:border-white/10 dark:bg-white/10" />
          <input name="email" placeholder="Email optional" className="rounded-lg border border-black/10 bg-cream px-3 py-3 dark:border-white/10 dark:bg-white/10" />
          <button className="rounded-lg bg-mango-500 px-4 py-3 font-black text-ink transition hover:bg-mango-300">
            Account save করুন
          </button>
        </div>
        <p className="mt-4 text-sm text-ink/60 dark:text-cream/60">
          Phone number দিয়ে profile save করলে পরে order history খুঁজে পাওয়া সহজ হবে।
        </p>
      </form>
      <div className="rounded-lg bg-white p-5 shadow-sm dark:bg-white/10">
        <h2 className="text-2xl font-black">Order history</h2>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            type="tel"
            inputMode="tel"
            placeholder="মোবাইল নম্বর"
            className="min-h-12 flex-1 rounded-lg border border-black/10 bg-cream px-3 py-3 dark:border-white/10 dark:bg-white/10"
          />
          <button onClick={loadOrders} className="min-h-12 rounded-lg bg-mango-500 px-4 py-3 font-black text-ink transition hover:bg-mango-300">
            Search
          </button>
        </div>
        <p className="mt-4 text-sm font-bold text-leaf-700 dark:text-mango-300">{message}</p>
        <div className="mt-4 grid gap-3">
          {orders.map((order) => (
            <div key={String(order.id)} className="rounded-lg bg-cream p-4 dark:bg-white/10">
              <p className="font-black">{order.id}</p>
              <p className="text-sm text-ink/60 dark:text-cream/60">
                ৳{order.total} | {order.status} | {order.payment_status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
