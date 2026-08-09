"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/lib/admin-store";

export default function AdminProvider({ children }: { children: React.ReactNode }) {
  const fetchOverrides = useAdminStore((s) => s.fetchOverrides);

  useEffect(() => {
    fetchOverrides();
  }, [fetchOverrides]);

  return <>{children}</>;
}
