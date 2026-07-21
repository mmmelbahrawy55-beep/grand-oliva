"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { useLocaleStore } from "@/lib/store";
import { useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <>
      <Toaster
        position={dir === "rtl" ? "top-left" : "top-right"}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#065f46",
            color: "#fff",
            borderRadius: "16px",
          },
        }}
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
