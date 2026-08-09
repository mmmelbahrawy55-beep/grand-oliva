"use client";

import { useEffect, useRef } from "react";
import { useAdminStore } from "@/lib/admin-store";

export default function AdminProvider({ children }: { children: React.ReactNode }) {
  const fetchOverrides = useAdminStore((s) => s.fetchOverrides);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetchOverrides();

    intervalRef.current = setInterval(() => {
      fetchOverrides();
    }, 30000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchOverrides]);

  return <>{children}</>;
}
