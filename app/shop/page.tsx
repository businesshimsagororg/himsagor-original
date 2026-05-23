import type { Metadata } from "next";
import { PaymentBadges } from "@/components/payment-badges";
import { SectionHeading } from "@/components/section-heading";
import { ShopProductGrid } from "@/components/shop-product-grid";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop Authentic Satkhira Himsagor Mango",
  description:
    "Order 5 KG, 10 KG, premium gift, and jumbo Himsagor mango boxes online in Bangladesh with COD."
};

export default function ShopPage() {
  return (
    <section className="section-pad">
      <div className="container-soft">
        <SectionHeading
          eyebrow="Shop"
          title="সাতক্ষীরার হিমসাগর box বেছে নিন"
          copy="পরিবার, gift বা bulk order - সব package COD supported, no advance payment, pan Bangladesh delivery."
        />
        <div className="mx-auto mt-6 flex max-w-3xl justify-center">
          <PaymentBadges compact />
        </div>
        <ShopProductGrid products={products} />
        <div className="mt-10 rounded-lg bg-white p-5 text-center shadow-sm dark:bg-white/10">
          <p className="text-xl font-black">Bulk or corporate gift order?</p>
          <p className="mt-2 text-ink/70 dark:text-cream/70">
            ২০ কেজির বেশি order-এর জন্য phone বা WhatsApp-এ যোগাযোগ করুন।
          </p>
        </div>
      </div>
    </section>
  );
}
