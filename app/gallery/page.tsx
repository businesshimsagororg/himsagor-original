import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { galleryImages } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Orchard, mango, packaging, and customer photo gallery for Himsagor Original."
};

export default function GalleryPage() {
  return (
    <section className="section-pad">
      <div className="container-soft">
        <SectionHeading
          eyebrow="Gallery"
          title="Orchard, packaging and customer moments"
          copy="Visual trust matters. এই gallery future customer photos এবং orchard updates রাখার জন্য তৈরি।"
        />
        <div className="mt-10 grid auto-rows-[220px] gap-4 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-lg shadow-sm ${
                index === 0 || index === 3 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
