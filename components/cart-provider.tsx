"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import type { CartItem, ShippingZone } from "@/lib/commerce";
import { getCartTotals } from "@/lib/commerce";
import { products } from "@/lib/products";

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  isOpen: boolean;
  zone: ShippingZone;
  couponCode: string;
  totals: ReturnType<typeof getCartTotals>;
  count: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setOpen: (open: boolean) => void;
  setZone: (zone: ShippingZone) => void;
  setCouponCode: (code: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [zone, setZone] = useState<ShippingZone>("bangladesh");
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("himsagor-cart");
    if (stored) {
      setItems(JSON.parse(stored));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("himsagor-cart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { productId, quantity }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.productId !== productId)
        : current.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const totals = getCartTotals(items, couponCode);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      isOpen,
      zone,
      couponCode,
      totals,
      count,
      addItem,
      removeItem,
      updateQuantity,
      setOpen,
      setZone,
      setCouponCode,
      clearCart
    }),
    [addItem, couponCode, count, hydrated, isOpen, items, removeItem, totals, updateQuantity, zone, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}

export function useCartProducts() {
  const { items } = useCart();
  return items.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.productId)
  }));
}
