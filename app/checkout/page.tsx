import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout for Himsagor Original mango orders with COD, bKash, and Nagad."
};

export default function CheckoutPage() {
  return (
    <section className="section-pad">
      <div className="container-soft">
        <CheckoutForm />
      </div>
    </section>
  );
}
