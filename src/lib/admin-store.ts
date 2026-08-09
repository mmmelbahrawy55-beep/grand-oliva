import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";

interface AdminStore {
  overrides: Record<string, Partial<Product>>;
  isAuthenticated: boolean;
  setOverride: (id: string, data: Partial<Product>) => void;
  removeOverride: (id: string) => void;
  login: (password: string) => boolean;
  logout: () => void;
  resetAll: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      overrides: {},
      isAuthenticated: false,

      setOverride: (id, data) =>
        set((state) => ({
          overrides: { ...state.overrides, [id]: { ...state.overrides[id], ...data } },
        })),

      removeOverride: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.overrides;
          return { overrides: rest };
        }),

      login: (password) => {
        if (password === "grandoliva2024") {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ isAuthenticated: false }),

      resetAll: () => set({ overrides: {} }),
    }),
    { name: "grand-oliva-admin" }
  )
);
