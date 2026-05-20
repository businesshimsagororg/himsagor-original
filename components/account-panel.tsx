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
          <input name="name" required placeholder="Full name" className="rounded-lg border border-black/10 bg-cream px-3 py-3 dark:border-white/10 dark:bg-white/10" />
          <input name="phone" required placeholder="Phone number" className="rounded-lg border border-black/10 bg-cream px-3 py-3 dark:border-white/10 dark:bg-white/10" />
          <input name="email" placeholder="Email optional" className="rounded-lg border border-black/10 bg-cream px-3 py-3 dark:border-white/10 dark:bg-white/10" />
          <button className="rounded-lg bg-ink px-4 py-3 font-black text-white dark:bg-mango-500 dark:text-ink">
            Save Account
          </button>
        </div>
        <p className="mt-4 text-sm text-ink/60 dark:text-cream/60">
          Saved addresses and wishlist data are supported in the database schema for production expansion.
        </p>
      </form>
      <div className="rounded-lg bg-white p-5 shadow-sm dark:bg-white/10">
        <h2 className="text-2xl font-black">Order history</h2>
        <div className="mt-5 flex gap-2">
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Phone number"
            className="flex-1 rounded-lg border border-black/10 bg-cream px-3 py-3 dark:border-white/10 dark:bg-white/10"
          />
          <button onClick={loadOrders} className="rounded-lg bg-mango-500 px-4 py-3 font-black text-ink">
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
