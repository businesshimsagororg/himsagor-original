"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 px-5 py-3 font-black dark:border-white/10"
    >
      <Printer size={18} /> Print Invoice
    </button>
  );
}
