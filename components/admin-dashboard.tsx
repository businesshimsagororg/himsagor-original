"use client";

import { useState } from "react";
import { products } from "@/lib/products";

export function AdminDashboard() {
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState<Array<Record<string, string | number>>>([]);
  const [message, setMessage] = useState("Enter ADMIN_TOKEN to load live orders.");

  async function loadOrders() {
    const response = await fetch(`/api/orders?token=${encodeURIComponent(token)}`);
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "Unable to load orders");
      setOrders([]);
      return;
    }
    setOrders(data.orders || []);
    setMessage(data.orders?.length ? "Live orders loaded." : "No orders yet or Supabase is not connected.");
  }

  return (
    <div className="rounded-lg bg-white p-5 shadow-soft dark:bg-white/10">
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="ADMIN_TOKEN"
          className="flex-1 rounded-lg border border-black/10 bg-cream px-3 py-3 outline-none dark:border-white/10 dark:bg-white/10"
        />
        <button
          onClick={loadOrders}
          className="rounded-lg bg-ink px-5 py-3 font-black text-white dark:bg-mango-500 dark:text-ink"
        >
          Load Orders
        </button>
      </div>
      <p className="mt-4 text-sm text-ink/70 dark:text-cream/70">{message}</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="py-3">Order</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={String(order.id)} className="border-b border-black/5 dark:border-white/10">
                <td className="py-3 font-bold">{order.id}</td>
                <td>{order.customer_name}</td>
                <td>{order.phone}</td>
                <td>৳{order.total}</td>
                <td>{order.status}</td>
                <td>{String(order.created_at || "").slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-black">Inventory snapshot</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg bg-cream p-4 dark:bg-white/10">
              <p className="font-black">{product.banglaName}</p>
              <p className="mt-2 text-sm text-ink/60 dark:text-cream/60">
                {product.stock} boxes | {product.weightKg} KG | ৳{product.price}
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white dark:bg-black/20">
                <div
                  className="h-full rounded-full bg-leaf-500"
                  style={{ width: `${Math.min(product.stock * 3, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
