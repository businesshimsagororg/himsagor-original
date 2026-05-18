import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { TrustBadges } from "@/components/trust-badges";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Himsagor Original, a premium Satkhira Himsagor mango brand serving Bangladesh."
};

export default function AboutPage() {
  return (
    <>
      <section className="section-pad">
        <div className="container-soft grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1300&q=90"
              alt="Satkhira mango orchard"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div className="self-center">
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="সাতক্ষীরার বাগানের মিষ্টি সম্পর্ক"
              copy="Himsagor Original তৈরি হয়েছে একটি সহজ বিশ্বাস থেকে: ভালো আমের স্বাদ শুধু পাকা হলেই হয় না, সেটা সঠিক বাগান, সঠিক সময়, সঠিক packing এবং সৎ communication-এর ফল।"
            />
            <div className="mt-8 grid gap-5 text-lg leading-9 text-ink/70 dark:text-cream/70">
              <p>
                আমরা orchard-level selection, family-grade sorting এবং careful
                delivery process ব্যবহার করি যাতে online order করেও customer
                বাজারের অনিশ্চয়তা ছাড়া premium mango experience পান।
              </p>
              <p>
                এই brand luxury দেখানোর জন্য নয়; বরং বাংলা পরিবারের ঈদের টেবিল,
                দুপুরের ভাতের পরের আম, আর প্রিয় মানুষকে gift পাঠানোর সহজ
                বিশ্বাসকে premium standard-এ নেওয়ার জন্য।
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad bg-white/60 dark:bg-black/10">
        <div className="container-soft">
          <TrustBadges />
        </div>
      </section>
    </>
  );
}
