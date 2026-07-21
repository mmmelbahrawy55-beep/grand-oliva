"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data/products";
import { useState } from "react";
import QuickView from "./QuickView";
import type { Product } from "@/lib/types";

export default function FeaturedProducts() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <section className="py-28 bg-[#0a0a0a]" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#c9a96e] text-xs font-semibold tracking-[0.3em] uppercase">
            {locale === "ar" ? "تشكيلتنا المميزة" : "Our Collection"}
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold text-white mt-6 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t(locale, "products.title")}
          </h2>
          <div className="divider-gold max-w-xs mx-auto">
            <span className="text-[#c9a96e] text-lg">✦</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 btn-gold px-10 py-5 rounded-xl text-base"
          >
            {locale === "ar" ? "عرض جميع المنتجات" : "View All Products"}
            <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </Link>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <QuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </section>
  );
}
