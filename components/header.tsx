"use client";

import Link from "next/link";
import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useState } from "react";
import { brand } from "@/lib/constants";
import { useCart } from "@/components/cart-provider";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["About", "/about"],
  ["Reviews", "/reviews"],
  ["Gallery", "/gallery"],
  ["Account", "/account"],
  ["Track", "/track"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/80 backdrop-blur-xl dark:border-white/10 dark:bg-leaf-900/80">
      <div className="container-soft flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-mango-500 text-lg font-black text-ink shadow-glow">
            HO
          </span>
          <span>
            <span className="block text-base font-black leading-tight">
              {brand.name}
            </span>
            <span className="block text-xs text-ink/60 dark:text-cream/70">
              {brand.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold text-ink/70 transition hover:text-leaf-700 dark:text-cream/75 dark:hover:text-mango-300"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 text-ink transition hover:bg-mango-100 dark:border-white/10 dark:bg-white/10 dark:text-cream"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="focus-ring relative grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition hover:bg-leaf-700 dark:bg-mango-500 dark:text-ink"
            aria-label="Open cart"
          >
            <ShoppingBag size={18} />
            {count ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-mango-500 px-1 text-xs font-bold text-ink dark:bg-white">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 lg:hidden dark:border-white/10 dark:bg-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-cream px-4 py-4 shadow-soft lg:hidden dark:border-white/10 dark:bg-leaf-900">
          <nav className="container-soft grid gap-2">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-bold hover:bg-mango-100 dark:hover:bg-white/10"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
