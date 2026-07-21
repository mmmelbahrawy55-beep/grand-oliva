"use client";

import { motion } from "framer-motion";
import { useLocaleStore, useCartStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const store = useCartStore();
  const { items, removeItem, updateQuantity, clearCart } = store;
  const total = store.getTotal();
  const itemCount = store.getItemCount();

  return (
    <section className="pt-28 pb-20 bg-gray-50 min-h-screen" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 font-serif">
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
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t(locale, "cart_page.empty")}
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all"
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
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-4xl">🫒</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900">
                        {locale === "ar" ? item.product.name_ar : item.product.name}
                      </h3>
                      <p className="text-emerald-600 font-bold text-xl mt-1">
                        ${item.product.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-emerald-700" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
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
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {locale === "ar" ? "ملخص الطلب" : "Order Summary"}
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>{t(locale, "cart_page.subtotal")}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{locale === "ar" ? "الشحن" : "Shipping"}</span>
                    <span className="text-emerald-600">
                      {locale === "ar" ? "مجاني" : "Free"}
                    </span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                    <span>{t(locale, "cart_page.total")}</span>
                    <span className="text-emerald-600">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30">
                  {t(locale, "cart_page.checkout")}
                </button>
                <button
                  onClick={clearCart}
                  className="w-full mt-3 border-2 border-gray-200 text-gray-600 py-3 rounded-2xl font-medium hover:border-red-300 hover:text-red-500 transition-all"
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
