import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
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
          title="Choose your Satkhira Himsagor box"
          copy="সব package COD supported, no advance payment, pan Bangladesh delivery."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
