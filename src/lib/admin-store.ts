import { create } from "zustand";
import type { Product } from "@/lib/types";

const LOCAL_KEY = "grand-oliva-overrides-backup";

function saveLocal(overrides: Record<string, Partial<Product>>) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(overrides));
  } catch {}
}

function loadLocal(): Record<string, Partial<Product>> | null {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function apiPost(body: Record<string, unknown>, retries = 2): Promise<boolean> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) return true;
    } catch {}
    if (i < retries) await new Promise((r) => setTimeout(r, 500 * (i + 1)));
  }
  return false;
}

async function apiGet(retries = 2): Promise<Record<string, Partial<Product>> | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch("/api/products");
      if (res.ok) return await res.json();
    } catch {}
    if (i < retries) await new Promise((r) => setTimeout(r, 500 * (i + 1)));
  }
  return null;
}

interface AdminStore {
  overrides: Record<string, Partial<Product>>;
  isAuthenticated: boolean;
  isOnline: boolean;
  lastSync: number;
  setOverride: (id: string, data: Partial<Product>) => Promise<void>;
  removeOverride: (id: string) => Promise<void>;
  fetchOverrides: () => Promise<void>;
  login: (password: string) => boolean;
  logout: () => void;
  resetAll: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  overrides: {},
  isAuthenticated: false,
  isOnline: false,
  lastSync: 0,

  setOverride: async (id, data) => {
    const newOverrides = { ...get().overrides, [id]: { ...(get().overrides[id] || {}), ...data } };
    set({ overrides: newOverrides });
    saveLocal(newOverrides);

    const ok = await apiPost({ id, data });
    if (!ok) {
      console.warn("Redis save failed, data backed up locally");
    }
  },

  removeOverride: async (id) => {
    const { [id]: _, ...rest } = get().overrides;
    set({ overrides: rest });
    saveLocal(rest);

    await apiPost({ id, action: "remove" });
  },

  fetchOverrides: async () => {
    const data = await apiGet();
    if (data !== null) {
      set({ overrides: data, isOnline: true, lastSync: Date.now() });
      saveLocal(data);
    } else {
      const local = loadLocal();
      if (local && Object.keys(local).length > 0) {
        set({ overrides: local, isOnline: false });
        for (const [id, data] of Object.entries(local)) {
          await apiPost({ id, data });
        }
        set({ isOnline: true });
      } else {
        set({ isOnline: false });
      }
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
    saveLocal({});
    await apiPost({ action: "reset" });
  },
}));
