"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/lib/data/products";

export default function FeaturedProducts() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="py-28 bg-gradient-to-b from-white to-gray-50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 text-sm font-medium">
              {locale === "ar" ? "تشكيلتنا المميزة" : "Featured Collection"}
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif tracking-tight">
            {t(locale, "products.title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {t(locale, "products.subtitle")}
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all duration-500 shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-gray-900/30 hover:-translate-y-1"
          >
            {locale === "ar" ? "عرض جميع المنتجات" : "View All Products"}
            <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
