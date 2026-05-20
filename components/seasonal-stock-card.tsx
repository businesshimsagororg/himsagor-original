"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SeasonalStockCard({ fallbackStock }: { fallbackStock: number }) {
  const [stock, setStock] = useState(fallbackStock);

  useEffect(() => {
    fetch("/api/inventory")
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.totalStock === "number") {
          setStock(data.totalStock);
        }
      })
      .catch(() => undefined);
  }, []);

  const stockPercent = Math.max(8, Math.min(100, Math.round((stock / fallbackStock) * 100)));

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-ink p-6 text-white shadow-soft dark:bg-black">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-3xl font-black">{stock} boxes left</p>
          <p className="text-white/70">Next dispatch closes tonight 10:00 PM</p>
        </div>
        <Link
          href="/shop"
          className="rounded-lg bg-mango-500 px-5 py-3 text-center font-black text-ink"
        >
          Reserve with COD
        </Link>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-mango-500"
          style={{ width: `${stockPercent}%` }}
        />
      </div>
    </div>
  );
}
