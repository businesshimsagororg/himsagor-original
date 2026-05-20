import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/track",
    "/faq",
    "/reviews",
    "/gallery",
    "/checkout",
    "/account",
    "/privacy-policy",
    "/return-policy",
    "/terms"
  ];

  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9
    }))
  ];
}
