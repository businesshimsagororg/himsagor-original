export type ProductPackage = {
  id: string;
  slug: string;
  name: string;
  banglaName: string;
  weightKg: number;
  price: number;
  compareAt?: number;
  badge: string;
  stock: number;
  deliveryEstimate: string;
  packaging: string;
  description: string;
  image: string;
  gallery: string[];
  taste: string[];
  bestFor: string[];
};

const productImages = [
  "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1400&q=90",
  "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1400&q=90",
  "https://images.unsplash.com/photo-1623934802699-3d6ca8f84914?auto=format&fit=crop&w=1400&q=90"
];

export const products: ProductPackage[] = [
  {
    id: "box-5kg",
    slug: "satkhira-himsagor-5kg-box",
    name: "5 KG Box",
    banglaName: "৫ কেজি অরিজিনাল বক্স",
    weightKg: 5,
    price: 749,
    compareAt: 890,
    badge: "Starter Pick",
    stock: 42,
    deliveryEstimate: "Dhaka 24-48h, Outside Dhaka 2-4 days",
    packaging: "Double-layer ventilated mango carton",
    description:
      "ছোট পরিবার বা প্রথমবার ট্রাই করার জন্য বাছাই করা মিষ্টি, আঁশবিহীন সাতক্ষীরার হিমসাগর।",
    image: productImages[0],
    gallery: productImages,
    taste: ["Rich sweet aroma", "Low fiber", "Creamy pulp", "Naturally ripened"],
    bestFor: ["Small families", "Fruit lovers", "First order"]
  },
  {
    id: "box-10kg",
    slug: "satkhira-himsagor-10kg-family-box",
    name: "10 KG Family Box",
    banglaName: "১০ কেজি ফ্যামিলি বক্স",
    weightKg: 10,
    price: 1399,
    compareAt: 1780,
    badge: "Best Value",
    stock: 31,
    deliveryEstimate: "Dhaka 24-48h, Outside Dhaka 2-4 days",
    packaging: "Family-grade reinforced carton with foam partition",
    description:
      "ফ্যামিলি অর্ডারের জন্য সবচেয়ে জনপ্রিয় প্যাক। বেশি পরিমাণে নিলে প্রতি কেজিতে সাশ্রয়।",
    image: productImages[1],
    gallery: productImages,
    taste: ["Deep mango fragrance", "Balanced sweetness", "Soft golden flesh"],
    bestFor: ["Families", "Monthly fruit plan", "Sharing"]
  },
  {
    id: "gift-premium",
    slug: "premium-himsagor-gift-box",
    name: "Premium Gift Box",
    banglaName: "প্রিমিয়াম গিফট বক্স",
    weightKg: 6,
    price: 1190,
    compareAt: 1450,
    badge: "Gift Ready",
    stock: 18,
    deliveryEstimate: "Dhaka 24-48h, Outside Dhaka 2-4 days",
    packaging: "Premium rigid gift box, ribbon, card, and protective nest",
    description:
      "আত্মীয়, ক্লায়েন্ট বা অফিস গিফটের জন্য প্রিমিয়াম প্যাকেজিংসহ নির্বাচিত বড় সাইজের আম।",
    image: productImages[2],
    gallery: productImages,
    taste: ["Elegant sweetness", "Fragrant", "Smooth pulp"],
    bestFor: ["Gift buyers", "Corporate orders", "Premium customers"]
  },
  {
    id: "jumbo-15kg",
    slug: "jumbo-satkhira-himsagor-box",
    name: "Jumbo Mango Box",
    banglaName: "১৫ কেজি জাম্বো বক্স",
    weightKg: 15,
    price: 1999,
    compareAt: 2670,
    badge: "Bulk Save",
    stock: 12,
    deliveryEstimate: "Dhaka 24-48h, Outside Dhaka 2-4 days",
    packaging: "Heavy-duty bulk carton with airflow and shock protection",
    description:
      "বড় পরিবার, অফিস বা শেয়ার অর্ডারের জন্য উচ্চমানের হিমসাগর বাল্ক প্যাক।",
    image: productImages[0],
    gallery: productImages,
    taste: ["Intense aroma", "Naturally sweet", "Juicy and fiber-light"],
    bestFor: ["Large families", "Office teams", "Bulk buyers"]
  }
];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
