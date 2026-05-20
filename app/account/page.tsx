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
          title="Customer account and order history"
          copy="Phone-based customer profile, order history lookup, saved address schema, and wishlist-ready database support."
        />
        <div className="mt-10">
          <AccountPanel />
        </div>
      </div>
    </section>
  );
}
