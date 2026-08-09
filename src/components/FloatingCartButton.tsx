"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore, useLocaleStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function FloatingCartButton() {
  const router = useRouter();
  const dir = useLocaleStore((s) => s.dir());
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => router.push("/cart")}
          className="lg:hidden fixed z-50 flex items-center justify-center w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#c9a96e] to-[#b8985d] shadow-[0_0_20px_rgba(201,169,110,0.4)] active:scale-90 transition-transform"
          style={{
            bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
            ...(dir === "rtl"
              ? { left: "1.5rem", right: "auto" }
              : { right: "1.5rem", left: "auto" }),
          }}
        >
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg" style={{ animation: "fabPulse 2s ease-in-out infinite" }}>
              {totalItems}
            </span>
          )}

          <ShoppingCart className="w-6 h-6 text-white" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
