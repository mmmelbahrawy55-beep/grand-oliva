"use client";

import { motion } from "framer-motion";
import { useLocaleStore, useCartStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const store = useCartStore();
  const { items, removeItem, updateQuantity, clearCart } = store;
  const total = store.getTotal();
  const itemCount = store.getItemCount();

  return (
    <section className="pt-28 pb-20 bg-[#0a0a0a] min-h-screen" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t(locale, "cart_page.title")}
          </h1>
          <p className="text-gray-500 mt-2">
            {itemCount} {locale === "ar" ? "منتج في السلة" : "items in cart"}
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-24 h-24 text-gray-700 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              {t(locale, "cart_page.empty")}
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 btn-gold px-8 py-4 rounded-xl font-bold transition-all"
            >
              {t(locale, "cart_page.continue_shopping")}
              <ArrowRight className={`w-5 h-5 ${dir === "rtl" ? "rotate-180" : ""}`} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#111111] rounded-2xl p-6 border border-[#2a2a2a] hover:border-[#c9a96e]/20 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-[#2a2a2a]">
                      <Image
                        src={item.product.image}
                        alt={locale === "ar" ? item.product.name_ar : item.product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-white">
                        {locale === "ar" ? item.product.name_ar : item.product.name}
                      </h3>
                      <p className="text-[#c9a96e] font-bold text-xl mt-1">
                        ${item.product.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-lg text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e]/20 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#2a2a2a] sticky top-28">
                <h2 className="text-xl font-bold text-white mb-6">
                  {locale === "ar" ? "ملخص الطلب" : "Order Summary"}
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>{t(locale, "cart_page.subtotal")}</span>
                    <span className="text-white">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>{locale === "ar" ? "الشحن" : "Shipping"}</span>
                    <span className="text-[#c9a96e]">
                      {locale === "ar" ? "مجاني" : "Free"}
                    </span>
                  </div>
                  <div className="border-t border-[#2a2a2a] pt-4 flex justify-between text-xl font-bold">
                    <span className="text-white">{t(locale, "cart_page.total")}</span>
                    <span className="text-[#c9a96e]">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="block w-full btn-gold py-4 rounded-xl font-bold text-lg transition-all text-center">
                  {t(locale, "cart_page.checkout")}
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full mt-3 border border-[#2a2a2a] text-gray-400 py-3 rounded-xl font-medium hover:border-red-500/30 hover:text-red-400 transition-all"
                >
                  {locale === "ar" ? "تفريغ السلة" : "Clear Cart"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
