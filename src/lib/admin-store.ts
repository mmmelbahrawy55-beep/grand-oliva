import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";

interface AdminStore {
  overrides: Record<string, Partial<Product>>;
  isAuthenticated: boolean;
  setOverride: (id: string, data: Partial<Product>) => Promise<void>;
  removeOverride: (id: string) => Promise<void>;
  fetchOverrides: () => Promise<void>;
  login: (password: string) => boolean;
  logout: () => void;
  resetAll: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      overrides: {},
      isAuthenticated: false,

      setOverride: async (id, data) => {
        set((state) => ({
          overrides: { ...state.overrides, [id]: { ...state.overrides[id], ...data } },
        }));
        try {
          await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, data }),
          });
        } catch (e) {
          console.error("Failed to save override:", e);
        }
      },

      removeOverride: async (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.overrides;
          return { overrides: rest };
        });
        try {
          await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, action: "remove" }),
          });
        } catch (e) {
          console.error("Failed to remove override:", e);
        }
      },

      fetchOverrides: async () => {
        try {
          const res = await fetch("/api/products");
          const data = await res.json();
          set({ overrides: data });
        } catch (e) {
          console.error("Failed to fetch overrides:", e);
        }
      },

      login: (password) => {
        if (password === "grandoliva2024") {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ isAuthenticated: false }),

      resetAll: async () => {
        set({ overrides: {} });
        try {
          await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "reset" }),
          });
        } catch (e) {
          console.error("Failed to reset overrides:", e);
        }
      },
    }),
    { name: "grand-oliva-admin" }
  )
);
