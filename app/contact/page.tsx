import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { brand } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Himsagor Original for mango orders, delivery, and support."
};

export default function ContactPage() {
  return (
    <section className="section-pad">
      <div className="container-soft">
        <SectionHeading
          eyebrow="Contact"
          title="অর্ডার, support, gift এবং bulk query"
          copy="Phone, WhatsApp বা form - যে কোনো মাধ্যমে আমাদের সাথে যোগাযোগ করতে পারেন।"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            <ContactItem icon={<Phone />} title="Phone" value={brand.phone} href={`tel:${brand.phone}`} />
            <ContactItem
              icon={<MessageCircle />}
              title="WhatsApp"
              value="Chat now"
              href={`https://wa.me/${brand.whatsapp}`}
            />
            <ContactItem icon={<Send />} title="Facebook" value="Himsagor Original" href={brand.facebook} />
            <div className="rounded-lg bg-white p-5 shadow-sm dark:bg-white/10">
              <MapPin className="mb-3 text-leaf-700 dark:text-mango-300" />
              <p className="font-black">Delivery Coverage Map</p>
              <div className="mt-4 grid h-56 place-items-center rounded-lg bg-[linear-gradient(135deg,#edf8ee,#fff1a8)] text-center text-ink">
                <p className="max-w-xs font-black">
                  Pan Bangladesh courier coverage with address confirmation
                </p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  title,
  value,
  href
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="flex items-center gap-4 rounded-lg bg-white p-5 shadow-sm dark:bg-white/10">
      <span className="text-leaf-700 dark:text-mango-300">{icon}</span>
      <span>
        <span className="block text-sm text-ink/60 dark:text-cream/60">{title}</span>
        <span className="font-black">{value}</span>
      </span>
    </a>
  );
}
