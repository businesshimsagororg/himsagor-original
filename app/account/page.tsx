import type { Metadata } from "next";
import { AccountPanel } from "@/components/account-panel";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Account",
  description: "Customer registration, order history, saved addresses, and wishlist for Himsagor Original."
};

export default function AccountPage() {
  return (
    <section className="section-pad">
      <div className="container-soft">
        <SectionHeading
          eyebrow="Account"
          title="Customer account ও order history"
          copy="Phone number দিয়ে profile save করুন এবং আগের order history খুঁজে দেখুন।"
        />
        <div className="mt-10">
          <AccountPanel />
        </div>
      </div>
    </section>
  );
}
