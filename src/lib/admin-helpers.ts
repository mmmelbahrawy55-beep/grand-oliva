import { products as baseProducts } from "@/lib/data/products";
import { useAdminStore } from "@/lib/admin-store";
import type { Product } from "@/lib/types";

export function getProducts(): Product[] {
  const overrides = useAdminStore.getState().overrides;
  return baseProducts.map((p) => ({
    ...p,
    ...(overrides[p.id] || {}),
  }));
}

export function getProductById(id: string): Product | undefined {
  const base = baseProducts.find((p) => p.id === id);
  if (!base) return undefined;
  const overrides = useAdminStore.getState().overrides;
  return { ...base, ...(overrides[id] || {}) };
}
