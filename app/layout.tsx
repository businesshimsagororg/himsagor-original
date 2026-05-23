import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";
import { Analytics } from "@/components/analytics";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { FloatingActions } from "@/components/floating-actions";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { brand, siteUrl } from "@/lib/constants";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bangla-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Himsagor Original | Authentic Satkhira Himsagor Mango Bangladesh",
    template: "%s | Himsagor Original"
  },
  description:
    "Buy authentic Satkhira Himsagor mango online in Bangladesh. Carbide-free, fresh from orchard, COD available, no advance payment.",
  keywords: [
    "Himsagor mango Bangladesh",
    "Satkhira mango",
    "Buy mango online BD",
    "Carbide free mango",
    "Premium mango Bangladesh"
  ],
  openGraph: {
    title: "Himsagor Original",
    description: brand.tagline,
    url: siteUrl,
    siteName: brand.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=90",
        width: 1200,
        height: 630,
        alt: "Premium Satkhira Himsagor Mango"
      }
    ],
    locale: "bn_BD",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Himsagor Original",
    description: brand.tagline
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${hindSiliguri.variable} font-sans antialiased`}>
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingActions />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
        <Analytics />
        {process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID ? (
          <Script id="messenger-placeholder" strategy="afterInteractive">
            {`window.himsagorMessengerPageId='${process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID}'`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
