"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data/products";
import { Search, SlidersHorizontal, X } from "lucide-react";

const categories = [
  { key: "all", ar: "الكل", en: "All", icon: "✨" },
  { key: "Olives", ar: "زيتون", en: "Olives", icon: "🫒" },
  { key: "Stuffed", ar: "محشي", en: "Stuffed", icon: "🧀" },
  { key: "Pickles", ar: "مخللات", en: "Pickles", icon: "🥒" },
  { key: "Middle Eastern", ar: "شرقي", en: "Middle Eastern", icon: "🌍" },
  { key: "Sauces", ar: "صلصات", en: "Sauces", icon: "🫙" },
  { key: "Premium", ar: "فاخر", en: "Premium", icon: "👑" },
];

export default function ProductsPage() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.name_ar.includes(searchQuery) ||
        p.description.toLowerCase().includes(query) ||
        p.description_ar.includes(searchQuery)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return b.featured ? 1 : -1;
      }
    });

  return (
    <section className="pt-28 pb-20 bg-gray-50 min-h-screen" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 font-serif">
            {t(locale, "products.title")}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t(locale, "products.subtitle")}
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-12 space-y-6">
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === "ar" ? "ابحث عن منتج..." : "Search products..."}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-white shadow-sm text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{locale === "ar" ? cat.ar : cat.en}</span>
              </motion.button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex items-center justify-between max-w-xl mx-auto">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-white text-sm"
              >
                <option value="featured">{locale === "ar" ? "المميزة" : "Featured"}</option>
                <option value="price-low">{locale === "ar" ? "السعر: من الأقل" : "Price: Low to High"}</option>
                <option value="price-high">{locale === "ar" ? "السعر: من الأعلى" : "Price: High to Low"}</option>
                <option value="rating">{locale === "ar" ? "الأعلى تقييماً" : "Top Rated"}</option>
                <option value="name">{locale === "ar" ? "الاسم" : "Name"}</option>
              </select>
            </div>
            <div className="text-gray-500 text-sm">
              {filteredProducts.length} {locale === "ar" ? "منتج" : "products"}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">
              {locale === "ar" ? "لا توجد منتجات مطابقة" : "No matching products found"}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
