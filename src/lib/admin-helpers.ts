import { products as baseProducts } from "@/lib/data/products";
import { useAdminStore } from "@/lib/admin-store";
import { useMemo } from "react";
import type { Product } from "@/lib/types";

export function useProducts(): Product[] {
  const overrides = useAdminStore((s) => s.overrides);
  return useMemo(() => {
    return baseProducts.map((p) => ({
      ...p,
      ...(overrides[p.id] || {}),
    }));
  }, [overrides]);
}

export function useProductById(id: string): Product | undefined {
  const products = useProducts();
  return useMemo(() => products.find((p) => p.id === id), [products, id]);
}

export function getProductsStatic(): Product[] {
  return baseProducts;
}
