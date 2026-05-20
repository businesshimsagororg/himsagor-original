import { products } from "@/lib/products";
import { supabase } from "@/lib/db";
import type { CartItem } from "@/lib/commerce";

const stockStore = globalThis as typeof globalThis & {
  himsagorStock?: Map<string, number>;
};

function ensureFallbackStock() {
  stockStore.himsagorStock ||= new Map(
    products.map((product) => [product.id, product.stock])
  );
  return stockStore.himsagorStock;
}

export function getFallbackStock(productId: string) {
  return ensureFallbackStock().get(productId) || 0;
}

export function getFallbackTotalStock() {
  return Array.from(ensureFallbackStock().values()).reduce(
    (sum, stock) => sum + stock,
    0
  );
}

export function decrementFallbackStock(items: CartItem[]) {
  const stock = ensureFallbackStock();
  const unavailable = items.find(
    (item) => (stock.get(item.productId) || 0) < item.quantity
  );

  if (unavailable) {
    return { ok: false, product_id: unavailable.productId, error: "out_of_stock" };
  }

  for (const item of items) {
    stock.set(item.productId, (stock.get(item.productId) || 0) - item.quantity);
  }

  return { ok: true };
}

export async function getInventorySnapshot() {
  if (!supabase) {
    return products.map((product) => ({
      product_id: product.id,
      stock: getFallbackStock(product.id)
    }));
  }

  const { data, error } = await supabase
    .from("product_inventory")
    .select("product_id, stock");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function decrementStock(items: CartItem[]) {
  if (!supabase) return decrementFallbackStock(items);

  const { data, error } = await supabase.rpc("decrement_inventory", {
    cart_items: items
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return data as { ok: boolean; product_id?: string; error?: string };
}
