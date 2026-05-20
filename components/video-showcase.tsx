import Image from "next/image";
import { Play } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export function VideoShowcase() {
  const videoUrl = process.env.NEXT_PUBLIC_ORCHARD_VIDEO_URL;

  return (
    <section className="section-pad bg-white/60 dark:bg-black/10">
      <div className="container-soft grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Orchard Video"
          title="বাগান, grading আর packaging কাছ থেকে দেখুন"
          copy="এখানে আপনার orchard visit, farmer story, packing process বা customer unboxing video বসানো যাবে।"
        />
        <div className="relative aspect-video overflow-hidden rounded-lg bg-ink shadow-soft">
          {videoUrl ? (
            <video
              controls
              playsInline
              preload="metadata"
              poster="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1200&q=90"
              className="h-full w-full object-cover"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <>
              <Image
                src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1200&q=90"
                alt="Satkhira mango orchard video poster"
                fill
                className="object-cover opacity-80"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
              <div className="absolute inset-0 grid place-items-center bg-black/20 text-center text-white">
                <div>
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mango-500 text-ink shadow-glow">
                    <Play fill="currentColor" />
                  </span>
                  <p className="mt-4 font-black">Upload orchard.mp4 or set video URL</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
