import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return (
    <section className="section-pad">
      <div className="container-soft">
        <SectionHeading
          eyebrow="Admin"
          title="Order management dashboard"
          copy="Load live orders from Supabase using ADMIN_TOKEN. Production teams can extend this with status updates, inventory, and courier exports."
        />
        <div className="mt-10">
          <AdminDashboard />
        </div>
      </div>
    </section>
  );
}
