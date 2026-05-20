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
  Sparkles,
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
  [BadgeCheck, "Grade A selection", "Size, maturity, aroma checked"],
  [PackageCheck, "Premium packaging", "Ventilation and shock protection"],
  [Truck, "Pan Bangladesh", "Dhaka and district delivery"],
  [ShieldCheck, "Complaint support", "Unboxing video mandatory"]
];

const premiumFeatures: Array<[LucideIcon, string, string]> = [
  [
    Clock,
    "Delivery Timeline",
    "Order confirm -> harvest batch match -> quality check -> dispatch -> home delivery."
  ],
  [
    Gift,
    "Premium Unboxing",
    "Gift box, family box, and reinforced cartons designed for a clean receiving experience."
  ],
  [
    Play,
    "Video Testimonials",
    "Customer video review slots are built for Facebook/WhatsApp proof and future uploads."
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
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-leaf-500/20 bg-white/70 px-4 py-2 text-sm font-bold text-leaf-700 shadow-sm dark:bg-white/10 dark:text-mango-300">
                <Sparkles size={16} /> 2026 seasonal harvest now open
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[1.05] text-ink md:text-7xl dark:text-cream">
                সাতক্ষীরার আসল হিমসাগর, প্রিমিয়াম যত্নে আপনার বাসায়।
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-ink/70 md:text-xl dark:text-cream/75">
                {brand.tagline}. Carbide-free, orchard-selected, COD available,
                no advance payment. পরিবার, gift, আর premium mango lovers-এর
                জন্য তৈরি একটি trusted online mango experience.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-4 font-black text-white shadow-soft transition hover:bg-leaf-700 dark:bg-mango-500 dark:text-ink"
                >
                  Order Himsagor Now <ArrowRight size={18} />
                </Link>
                <a
                  href={`tel:${brand.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white/80 px-6 py-4 font-black dark:border-white/10 dark:bg-white/10"
                >
                  Call {brand.phone}
                </a>
              </div>
              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                {[
                  ["COD", "No advance"],
                  ["Pan BD", "Delivery"],
                  ["100%", "Authentic"]
                ].map(([big, small]) => (
                  <div key={big} className="rounded-lg bg-white/70 p-4 text-center shadow-sm dark:bg-white/10">
                    <p className="text-2xl font-black">{big}</p>
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
              <div className="absolute -right-4 top-12 z-10 rounded-lg bg-white/90 p-4 shadow-soft dark:bg-leaf-900/90">
                <p className="text-sm font-black">Ripeness</p>
                <div className="mt-2 h-2 w-36 overflow-hidden rounded-full bg-mango-100">
                  <div className="h-full w-[78%] rounded-full bg-mango-500" />
                </div>
                <p className="mt-2 text-xs text-ink/60 dark:text-cream/70">
                  Ready in 1-2 days
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
                <p className="text-3xl font-black">No Carbide</p>
                <p className="text-sm font-bold">Natural sweetness first</p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section-pad bg-white/60 dark:bg-black/10">
        <div className="container-soft">
          <SectionHeading
            eyebrow="Shop"
            title="এই মৌসুমের premium mango packages"
            copy="Weight, price, packaging, stock এবং delivery estimate সব পরিষ্কারভাবে দেখুন।"
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
              title="আমরা আম বিক্রি করি না, বাগানের বিশ্বাস পৌঁছে দিই।"
              copy="Satkhira orchard থেকে mango selection শুরু হয় size, smell, skin texture, maturity এবং transport tolerance দেখে। এরপর protective carton-এ packing করে Dhaka hub থেকে delivery dispatch করা হয়।"
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
            copy="Trust badge শুধু design না; এগুলো আমাদের operating promise."
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
                  src="https://images.unsplash.com/photo-1623934802699-3d6ca8f84914?auto=format&fit=crop&w=800&q=85"
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
                Random market uncertainty থেকে curated orchard selection ও premium
                packing-এ upgrade.
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
                ১০ KG Family Box best value. COD available, delivery ২৪-৪৮h.
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
            eyebrow="Seasonal Urgency"
            title="Current harvest batch is limited"
            copy="হিমসাগর season ছোট। তাই stock meter, delivery countdown এবং batch-wise dispatch ব্যবহার করা হয়েছে যেন customer clear expectation পান।"
          />
          <SeasonalStockCard fallbackStock={fallbackBatchStock} />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-soft">
          <SectionHeading
            eyebrow="Reviews"
            title="বাসার টেবিলে পৌঁছানোর পরের কথাগুলো"
            copy="Realistic buyer stories help new customers feel the product before they order."
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
            Cash on Delivery, no advance payment. Complaint claim-এর জন্য শুধু
            unboxing video রাখুন।
          </p>
          <Link
            href="/checkout"
            className="mt-8 inline-flex rounded-lg bg-ink px-7 py-4 font-black text-white"
          >
            Checkout Now
          </Link>
        </div>
      </section>
    </>
  );
}
