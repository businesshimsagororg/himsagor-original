import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Gift,
  PackageCheck,
  Play,
  ShieldCheck,
  Truck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FaqList } from "@/components/faq-list";
import { MotionReveal } from "@/components/motion-reveal";
import { ProductCard } from "@/components/product-card";
import { ReviewSlider } from "@/components/review-slider";
import { SectionHeading } from "@/components/section-heading";
import { SeasonalStockCard } from "@/components/seasonal-stock-card";
import { TrustBadges } from "@/components/trust-badges";
import { VideoShowcase } from "@/components/video-showcase";
import { brand } from "@/lib/constants";
import { faqs } from "@/lib/faqs";
import { products } from "@/lib/products";

const orchardSteps: Array<[LucideIcon, string, string]> = [
  [BadgeCheck, "Grade A selection", "Size, maturity, aroma checked before packing"],
  [PackageCheck, "Protective packaging", "Ventilated carton and careful handling"],
  [Truck, "Pan Bangladesh delivery", "Flat delivery logic with order confirmation"],
  [ShieldCheck, "Clear support rule", "Unboxing video required for delivery complaints"]
];

const premiumFeatures: Array<[LucideIcon, string, string]> = [
  [
    Clock,
    "Delivery Timeline",
    "Order confirm -> quality check -> secure packing -> courier dispatch -> home delivery."
  ],
  [
    Gift,
    "Premium Unboxing",
    "Gift box, family box, and reinforced cartons prepared for a clean receiving experience."
  ],
  [
    Play,
    "Video Testimonials",
    "Customer video proof and product clips can be added here as real orders grow."
  ]
];

const fallbackBatchStock = products.reduce((sum, product) => sum + product.stock, 0);

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.slice(0, 8).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-10 md:py-16">
        <div className="container-soft grid min-h-[calc(100vh-8rem)] items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <MotionReveal>
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-leaf-500/20 bg-white/80 px-4 py-2 text-sm font-bold text-leaf-700 shadow-sm dark:bg-white/10 dark:text-mango-300">
                Premium Satkhira Himsagor
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[1.05] text-ink md:text-7xl dark:text-cream">
                সাতক্ষীরার বাছাইকৃত হিমসাগর, সরাসরি আপনার ঘরে।
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-ink/70 md:text-xl dark:text-cream/75">
                {brand.tagline}. COD available, কোনো advance payment লাগবে না,
                এবং প্রতিটি box careful packing করে পাঠানো হয়।
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-4 font-black text-white shadow-soft transition hover:bg-leaf-700 dark:bg-mango-500 dark:text-ink"
                >
                  এখনই অর্ডার করুন <ArrowRight size={18} />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white/80 px-6 py-4 font-black dark:border-white/10 dark:bg-white/10"
                >
                  প্যাকেজ দেখুন
                </Link>
              </div>
              <p className="mt-4 text-sm font-bold text-ink/60 dark:text-cream/60">
                ফোনে অর্ডার: <a href={`tel:${brand.phone}`} className="text-leaf-700 dark:text-mango-300">{brand.phone}</a>
              </p>
              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                {[
                  ["COD", "Cash on delivery"],
                  ["No Advance", "আগে টাকা নয়"],
                  ["Pan BD", "সারা দেশে"]
                ].map(([big, small]) => (
                  <div key={big} className="rounded-lg bg-white/70 p-4 text-center shadow-sm dark:bg-white/10">
                    <p className="text-xl font-black md:text-2xl">{big}</p>
                    <p className="text-xs font-bold text-ink/60 dark:text-cream/60">
                      {small}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.15}>
            <div className="relative">
              <div className="absolute -right-2 top-10 z-10 rounded-lg bg-white/90 p-4 shadow-soft dark:bg-leaf-900/90">
                <p className="text-sm font-black">Orchard Selected</p>
                <p className="mt-1 max-w-36 text-xs leading-5 text-ink/60 dark:text-cream/70">
                  Aroma, firmness and size checked before packing.
                </p>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-glow">
                <Image
                  priority
                  src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1400&q=90"
                  alt="Premium Himsagor mangoes"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
              <div className="mango-float absolute -bottom-7 left-6 rounded-lg bg-mango-500 p-5 text-ink shadow-soft">
                <p className="text-2xl font-black">Fresh Batch</p>
                <p className="text-sm font-bold">Packed after order confirmation</p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section-pad bg-white/60 dark:bg-black/10">
        <div className="container-soft">
          <SectionHeading
            eyebrow="Shop"
            title="আপনার প্রয়োজন অনুযায়ী mango package বাছাই করুন"
            copy="Weight, price, packaging এবং delivery estimate এক জায়গায় পরিষ্কারভাবে দেখুন।"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-soft grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionReveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1400&q=90"
                alt="Satkhira orchard mangoes"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <SectionHeading
              align="left"
              eyebrow="Orchard Story"
              title="বাগান থেকে box পর্যন্ত প্রতিটি ধাপে যত্ন।"
              copy="Satkhira orchard থেকে mango selection শুরু হয় size, smell, skin texture এবং maturity দেখে। এরপর protective carton-এ packing করে courier delivery-এর জন্য প্রস্তুত করা হয়।"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {orchardSteps.map(([Icon, title, text]) => (
                <div key={title} className="rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
                  <Icon className="mb-3 text-leaf-700 dark:text-mango-300" />
                  <p className="font-black">{String(title)}</p>
                  <p className="mt-1 text-sm text-ink/60 dark:text-cream/60">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section-pad bg-leaf-900 text-cream">
        <div className="container-soft">
          <SectionHeading
            eyebrow="Trust"
            title="যে কারণে Himsagor Original আলাদা"
            copy="কম কথা, পরিষ্কার promise: আসল উৎস, COD, careful packing, এবং support process."
          />
          <div className="mt-12">
            <TrustBadges />
          </div>
        </div>
      </section>

      <VideoShowcase />

      <section className="section-pad">
        <div className="container-soft grid gap-8 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-soft dark:bg-white/10">
            <p className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-leaf-700 dark:text-mango-300">
              Quality Grading
            </p>
            <h3 className="text-3xl font-black">Grade A mango only</h3>
            <div className="mt-6 grid gap-3">
              {["Aroma check", "Skin maturity", "Firmness test", "Transport-safe sorting"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg bg-cream p-3 dark:bg-white/10">
                  <span className="font-bold">{item}</span>
                  <BadgeCheck className="text-leaf-700 dark:text-mango-300" size={18} />
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-soft dark:bg-white/10">
            <div className="grid grid-cols-2">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1551286631-9c0bd2c4ab2a?auto=format&fit=crop&w=800&q=80"
                  alt="Unsorted mango market comparison"
                  fill
                  className="object-cover grayscale"
                  sizes="50vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-black text-ink">
                  Before
                </span>
              </div>
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=800&q=85"
                  alt="Fresh graded mango packaging"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <span className="absolute right-3 top-3 rounded-full bg-mango-500 px-3 py-1 text-xs font-black text-ink">
                  After
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="font-black">Before/after freshness comparison</p>
              <p className="mt-2 text-sm leading-6 text-ink/60 dark:text-cream/70">
                বাজারের random selection-এর বদলে curated orchard selection ও
                protective packing.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-ink p-6 text-white shadow-soft dark:bg-black">
            <p className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-mango-300">
              AI Chatbot UI
            </p>
            <h3 className="text-3xl font-black">Mango order assistant</h3>
            <div className="mt-6 grid gap-3">
              <div className="mr-8 rounded-lg bg-white/10 p-3 text-sm">
                কোন box family-এর জন্য ভালো?
              </div>
              <div className="ml-8 rounded-lg bg-mango-500 p-3 text-sm font-bold text-ink">
                ১০ KG Family Box family order-এর জন্য best value. COD available.
              </div>
              <div className="mr-8 rounded-lg bg-white/10 p-3 text-sm">
                Gift note দেওয়া যাবে?
              </div>
              <div className="ml-8 rounded-lg bg-mango-500 p-3 text-sm font-bold text-ink">
                Premium Gift Box-এ custom message card দেওয়া যাবে.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-soft grid gap-8 lg:grid-cols-3">
          {premiumFeatures.map(([Icon, title, text]) => (
            <div key={title} className="rounded-lg bg-white p-6 shadow-soft dark:bg-white/10">
              <Icon className="mb-4 text-leaf-700 dark:text-mango-300" size={28} />
              <h3 className="text-2xl font-black">{title}</h3>
              <p className="mt-3 leading-8 text-ink/70 dark:text-cream/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-white/60 dark:bg-black/10">
        <div className="container-soft">
          <SectionHeading
            eyebrow="Seasonal Batch"
            title="হিমসাগরের season ছোট, তাই batch-wise order নেওয়া হয়"
            copy="Stock number live হলে update হবে। না হলে আমরা order confirmation call-এ available batch clear করে জানাই।"
          />
          <SeasonalStockCard fallbackStock={fallbackBatchStock} />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-soft">
          <SectionHeading
            eyebrow="Reviews"
            title="বাসার টেবিলে পৌঁছানোর পরের কথাগুলো"
            copy="প্রতিটি review আলাদা customer context দিয়ে দেখানো হয়েছে, যাতে বিশ্বাস তৈরি হয়।"
          />
          <div className="mt-10">
            <ReviewSlider />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white/60 dark:bg-black/10">
        <div className="container-soft grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="অর্ডারের আগে যেগুলো জানা দরকার"
            copy="COD, delivery, return, freshness, complaint process সবকিছু পরিষ্কারভাবে বলা হয়েছে।"
          />
          <FaqList limit={8} />
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container-soft rounded-lg bg-mango-500 p-8 text-center text-ink shadow-glow md:p-12">
          <h2 className="text-4xl font-black md:text-6xl">আজই আপনার mango box reserve করুন</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold">
            Cash on Delivery, no advance payment. Delivery issue হলে support-এর
            জন্য receiving time-এর unboxing video রাখুন।
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-lg bg-ink px-7 py-4 font-black text-white"
          >
            প্যাকেজ বাছাই করুন
          </Link>
        </div>
      </section>
    </>
  );
}
