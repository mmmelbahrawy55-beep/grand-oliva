"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLocaleStore, useCartStore } from "@/lib/store";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const store = useCartStore();
  const { items, removeItem, updateQuantity, clearCart } = store;
  const total = store.getTotal();
  const itemCount = store.getItemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: dir === "rtl" ? -400 : 400 }}
            animate={{ x: 0 }}
            exit={{ x: dir === "rtl" ? -400 : 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 ${dir === "rtl" ? "left-0" : "right-0"} h-full w-full max-w-md bg-[#111] border-l border-[#2a2a2a] z-[70] flex flex-col`}
            dir={dir}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#c9a96e]" />
                <h2 className="text-lg font-bold text-white">
                  {locale === "ar" ? "سلة المشتريات" : "Cart"}
                </h2>
                <span className="text-xs text-[#c9a96e] bg-[#c9a96e]/10 px-2 py-1 rounded-lg">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-white hover:border-[#c9a96e]/30 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <ShoppingBag className="w-16 h-16 text-gray-700 mb-4" />
                    <p className="text-gray-500 mb-4">
                      {locale === "ar" ? "سلتك فارغة" : "Your cart is empty"}
                    </p>
                    <button
                      onClick={onClose}
                      className="btn-gold px-6 py-3 rounded-xl text-sm font-bold"
                    >
                      {locale === "ar" ? "ابدأ التسوق" : "Start Shopping"}
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="flex gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a]"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden relative bg-[#222] shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">
                          {locale === "ar" ? item.product.name_ar : item.product.name}
                        </h3>
                        <p className="text-[#c9a96e] font-bold text-sm mt-1">
                          ${item.product.price}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-[#222] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c9a96e]/30 transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-[#222] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c9a96e]/30 transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-600 hover:text-red-500 transition-colors self-start"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#2a2a2a] space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{locale === "ar" ? "المجموع" : "Subtotal"}</span>
                  <span className="text-white font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{locale === "ar" ? "الشحن" : "Shipping"}</span>
                  <span className="text-[#c9a96e]">{locale === "ar" ? "مجاني" : "Free"}</span>
                </div>
                <div className="gold-line" />
                <div className="flex justify-between">
                  <span className="text-white font-bold">{locale === "ar" ? "الإجمالي" : "Total"}</span>
                  <span className="text-[#c9a96e] font-bold text-xl">${total.toFixed(2)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="btn-gold w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  {locale === "ar" ? "إتمام الشراء" : "Checkout"}
                  <ArrowRight className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full py-3 rounded-xl border border-[#2a2a2a] text-gray-500 text-sm hover:text-red-500 hover:border-red-500/30 transition-all"
                >
                  {locale === "ar" ? "تفريغ السلة" : "Clear Cart"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
