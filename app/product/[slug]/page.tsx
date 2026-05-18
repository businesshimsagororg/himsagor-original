import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { ProductCard } from "@/components/product-card";
import { ProductDetailActions } from "@/components/product-detail-actions";
import { ReviewSlider } from "@/components/review-slider";
import { SectionHeading } from "@/components/section-heading";
import { TrustBadges } from "@/components/trust-badges";
import { formatTk } from "@/lib/commerce";
import { getProductBySlug, products } from "@/lib/products";
import { siteUrl } from "@/lib/constants";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.banglaName,
    description: product.description,
    openGraph: {
      title: product.banglaName,
      description: product.description,
      images: [product.image]
    }
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery,
    description: product.description,
    brand: "Himsagor Original",
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/product/${product.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <section className="section-pad">
        <div className="container-soft grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-soft">
              <Image
                src={product.image}
                alt={product.banglaName}
                fill
                className="object-cover transition duration-700 hover:scale-110"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.gallery.map((image) => (
                <div key={image} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image src={image} alt={product.name} fill className="object-cover" sizes="30vw" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 inline-flex rounded-full bg-mango-500 px-3 py-1 text-sm font-black text-ink">
              {product.badge}
            </p>
            <h1 className="text-4xl font-black md:text-6xl">{product.banglaName}</h1>
            <p className="mt-4 text-lg leading-8 text-ink/70 dark:text-cream/70">
              {product.description}
            </p>
            <div className="mt-6 flex items-end gap-3">
              <p className="text-4xl font-black">{formatTk(product.price)}</p>
              {product.compareAt ? (
                <p className="pb-1 text-lg text-ink/40 line-through dark:text-cream/40">
                  {formatTk(product.compareAt)}
                </p>
              ) : null}
            </div>
            <ProductDetailActions productId={product.id} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Info label="Origin" value="Satkhira orchard, Bangladesh" />
              <Info label="Harvest" value="Current seasonal batch" />
              <Info label="Delivery" value={product.deliveryEstimate} />
              <Info label="Packaging" value={product.packaging} />
            </div>
            <div className="mt-8 rounded-lg bg-white p-5 shadow-sm dark:bg-white/10">
              <h2 className="text-xl font-black">Taste Profile</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.taste.map((taste) => (
                  <span key={taste} className="rounded-full bg-mango-100 px-3 py-1 text-sm font-bold text-ink">
                    {taste}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad bg-white/60 dark:bg-black/10">
        <div className="container-soft">
          <TrustBadges />
        </div>
      </section>
      <section className="section-pad">
        <div className="container-soft">
          <SectionHeading title="Customer reviews" eyebrow="Proof" />
          <div className="mt-10">
            <ReviewSlider />
          </div>
        </div>
      </section>
      <section className="section-pad bg-white/60 dark:bg-black/10">
        <div className="container-soft grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading align="left" title="Product FAQ" eyebrow="Before order" />
          <FaqList limit={6} />
        </div>
      </section>
      <section className="section-pad">
        <div className="container-soft">
          <SectionHeading title="You may also like" eyebrow="More packages" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((entry) => entry.id !== product.id)
              .map((entry) => (
                <ProductCard key={entry.id} product={entry} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-700 dark:text-mango-300">
        {label}
      </p>
      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}
