export const brand = {
  name: "Himsagor Original",
  banglaName: "হিমসাগর অরিজিনাল",
  phone: "01577428064",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801577428064",
  facebook:
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE ||
    "https://facebook.com/himsagororiginal",
  tagline: "সাতক্ষীরার বাগান থেকে সরাসরি আপনার ঘরে",
  email: "care@himsagororiginal.com",
  address: "Satkhira Orchard Desk, Dhaka Fulfillment Hub, Bangladesh"
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://himsagororiginal.com";

export const trustPoints = [
  "100% Authentic Satkhira Himsagor",
  "No Carbide Used",
  "Fresh From Orchard",
  "Cash on Delivery Available",
  "No Advance Payment",
  "Premium Packaging",
  "Safe Home Delivery",
  "Customer Satisfaction Priority"
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1623934802699-3d6ca8f84914?auto=format&fit=crop&w=1200&q=85",
    alt: "Fresh mangoes arranged for premium packaging"
  },
  {
    src: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1200&q=85",
    alt: "Mangoes hanging in a green orchard"
  },
  {
    src: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=85",
    alt: "Ripe mango closeup"
  },
  {
    src: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=1200&q=85",
    alt: "Gift-ready fruit packaging"
  },
  {
    src: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=1200&q=85",
    alt: "Family sharing fresh fruit at home"
  },
  {
    src: "https://images.unsplash.com/photo-1551286631-9c0bd2c4ab2a?auto=format&fit=crop&w=1200&q=85",
    alt: "Fresh fruit market quality selection"
  }
];
