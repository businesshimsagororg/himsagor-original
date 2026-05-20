type MemoryOrder = Record<string, unknown>;

const globalStore = globalThis as typeof globalThis & {
  himsagorOrders?: MemoryOrder[];
};

export function saveMemoryOrder(order: MemoryOrder) {
  globalStore.himsagorOrders ||= [];
  globalStore.himsagorOrders.unshift(order);
}

export function listMemoryOrders() {
  return globalStore.himsagorOrders || [];
}

export function findMemoryOrder(orderId: string, phone?: string) {
  return listMemoryOrders().find(
    (order) => order.id === orderId && (!phone || order.phone === phone)
  );
}

export function updateMemoryOrder(orderId: string, updates: MemoryOrder) {
  globalStore.himsagorOrders ||= [];
  globalStore.himsagorOrders = globalStore.himsagorOrders.map((order) =>
    order.id === orderId ? { ...order, ...updates } : order
  );
  return globalStore.himsagorOrders.find((order) => order.id === orderId);
}
