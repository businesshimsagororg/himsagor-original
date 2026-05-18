import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PrintButton } from "@/components/print-button";
import { formatTk } from "@/lib/commerce";
import { brand } from "@/lib/constants";

export default async function OrderSuccessPage({
  searchParams
}: {
  searchParams: Promise<{ orderId?: string; total?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.orderId || "HIM-CONFIRMED";
  const total = Number(params.total || 0);

  return (
    <section className="section-pad">
      <div className="container-soft max-w-3xl">
        <div className="rounded-lg bg-white p-8 text-center shadow-soft dark:bg-white/10">
          <CheckCircle2 className="mx-auto text-leaf-700 dark:text-mango-300" size={54} />
          <h1 className="mt-5 text-4xl font-black">Order Confirmed</h1>
          <p className="mt-3 text-lg text-ink/70 dark:text-cream/70">
            ধন্যবাদ। আপনার mango order confirm হয়েছে। আমাদের team call করে delivery
            details verify করবে।
          </p>
          <div className="mx-auto mt-8 max-w-md rounded-lg bg-cream p-5 text-left dark:bg-white/10">
            <p className="flex justify-between">
              <span>Order ID</span>
              <strong>{orderId}</strong>
            </p>
            <p className="mt-2 flex justify-between">
              <span>Total</span>
              <strong>{formatTk(total)}</strong>
            </p>
            <p className="mt-2 flex justify-between">
              <span>Payment</span>
              <strong>COD / selected method</strong>
            </p>
            <p className="mt-4 rounded-lg bg-mango-100 p-3 text-sm font-bold text-ink">
              Delivery complaint-এর জন্য unboxing video mandatory.
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PrintButton />
            <Link href="/track" className="rounded-lg bg-ink px-5 py-3 font-black text-white dark:bg-mango-500 dark:text-ink">
              Track Order
            </Link>
          </div>
          <p className="mt-6 text-sm text-ink/60 dark:text-cream/60">
            Hotline: {brand.phone}
          </p>
        </div>
      </div>
    </section>
  );
}
