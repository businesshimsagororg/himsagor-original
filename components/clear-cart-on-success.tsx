"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";

export function ClearCartOnSuccess() {
  const { clearCart, setOpen } = useCart();

  useEffect(() => {
    clearCart();
    setOpen(false);
  }, [clearCart, setOpen]);

  return null;
}
