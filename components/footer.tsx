import Link from "next/link";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { brand, trustPoints } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-ink px-4 py-12 text-cream dark:bg-black">
      <div className="container-soft grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-mango-500 font-black text-ink">
              HO
            </span>
            <div>
              <p className="font-black">{brand.name}</p>
              <p className="text-sm text-cream/70">{brand.tagline}</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-cream/70">
            Premium Satkhira Himsagor mangoes delivered across Bangladesh with
            COD, careful grading, and unboxing-video supported complaint review.
          </p>
        </div>
        <div>
          <p className="mb-4 font-bold">Quick Links</p>
          <div className="grid gap-2 text-sm text-cream/75">
            <Link href="/shop">Shop Mangoes</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/track">Order Tracking</Link>
            <Link href="/return-policy">Return Policy</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold">Trust & Contact</p>
          <div className="grid gap-3 text-sm text-cream/75">
            <a href={`tel:${brand.phone}`} className="flex items-center gap-2">
              <Phone size={16} /> {brand.phone}
            </a>
            <a href={brand.facebook} className="flex items-center gap-2">
              <MessageCircle size={16} /> Facebook Page
            </a>
            <p className="flex items-center gap-2">
              <ShieldCheck size={16} /> No advance payment required
            </p>
          </div>
        </div>
      </div>
      <div className="container-soft mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
        {trustPoints.slice(0, 5).map((point) => (
          <span
            key={point}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-cream/70"
          >
            {point}
          </span>
        ))}
      </div>
    </footer>
  );
}
