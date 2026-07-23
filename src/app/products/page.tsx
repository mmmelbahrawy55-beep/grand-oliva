"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data/products";
import { Search, SlidersHorizontal, X, Grid, List } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const categories = [
  { key: "all", ar: "الكل", en: "All", icon: "✨", count: 200 },
  { key: "Olives", ar: "زيتون", en: "Olives", icon: "🫒", count: 100 },
  { key: "Pickles", ar: "مخللات", en: "Pickles", icon: "🥒", count: 100 },
];

export default function ProductsPage() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products
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
  }, [activeCategory, searchQuery, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const oliveProducts = useMemo(() => products.filter((p) => p.category === "Olives"), []);

  return (
    <section className="pt-28 pb-20 bg-[#0a0a0a] min-h-screen" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-[#c9a96e] text-xs font-semibold tracking-[0.3em] uppercase">
            {locale === "ar" ? "مجموعة منتجاتنا" : "Our Product Collection"}
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mt-6 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {locale === "ar" ? "زيتون ومخللات" : "Olives & Pickles"}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {locale === "ar"
              ? "نكحة الأصالة وجودة لا مثيل لها. نقدم أفضل الأنواع المختارة بعناية."
              : "The taste of authenticity with unmatched quality. We offer the finest carefully selected varieties."}
          </p>
        </motion.div>

        <div className="mb-12 space-y-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className={`absolute ${dir === "rtl" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === "ar" ? "ابحث عن منتج..." : "Search products..."}
              className="w-full bg-[#111] border border-[#2a2a2a] text-white placeholder-gray-500 rounded-2xl focus:border-[#c9a96e] focus:ring-2 focus:ring-[#c9a96e]/20 outline-none transition-all py-4 px-12 text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute ${dir === "rtl" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#c9a96e]`}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 border ${
                  activeCategory === cat.key
                    ? "bg-[#c9a96e] text-[#0a0a0a] border-[#c9a96e] shadow-lg shadow-[#c9a96e]/20"
                    : "bg-[#111] text-gray-400 border-[#2a2a2a] hover:border-[#c9a96e]/30 hover:text-[#c9a96e]"
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{locale === "ar" ? cat.ar : cat.en}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === cat.key
                      ? "bg-[#0a0a0a]/20 text-[#0a0a0a]"
                      : "bg-[#2a2a2a] text-gray-500"
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500">
                <SlidersHorizontal className="w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-[#2a2a2a] bg-[#111] text-white focus:border-[#c9a96e] outline-none text-sm"
                >
                  <option value="featured">{locale === "ar" ? "المميزة" : "Featured"}</option>
                  <option value="price-low">{locale === "ar" ? "السعر: من الأقل" : "Price: Low to High"}</option>
                  <option value="price-high">{locale === "ar" ? "السعر: من الأعلى" : "Price: High to Low"}</option>
                  <option value="rating">{locale === "ar" ? "الأعلى تقييماً" : "Top Rated"}</option>
                  <option value="name">{locale === "ar" ? "الاسم" : "Name"}</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-[#c9a96e] text-[#0a0a0a]" : "bg-[#111] text-gray-500 hover:text-[#c9a96e]"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-[#c9a96e] text-[#0a0a0a]" : "bg-[#111] text-gray-500 hover:text-[#c9a96e]"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} {locale === "ar" ? "من" : "of"} {filteredProducts.length} {locale === "ar" ? "منتج" : "products"}
            </div>
          </div>
        </div>

        {activeCategory === "all" && !searchQuery && (
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {locale === "ar" ? "زيتون متميز" : "Premium Olives"}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {oliveProducts.slice(0, 8).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery + sortBy + currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {paginatedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-6">
            <span className="text-gray-500 text-sm">
              {locale === "ar" ? "صفحة" : "Page"} {currentPage} {locale === "ar" ? "من" : "of"} {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2.5 rounded-xl border border-[#2a2a2a] bg-[#111] text-gray-400 text-sm font-medium transition-all hover:border-[#c9a96e]/40 hover:text-[#c9a96e] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#2a2a2a] disabled:hover:text-gray-400"
              >
                {locale === "ar" ? "السابق" : "Previous"}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all border ${
                    currentPage === page
                      ? "bg-[#c9a96e] text-[#0a0a0a] border-[#c9a96e] shadow-lg shadow-[#c9a96e]/20"
                      : "bg-[#111] text-gray-400 border-[#2a2a2a] hover:border-[#c9a96e]/30 hover:text-[#c9a96e]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 rounded-xl border border-[#2a2a2a] bg-[#111] text-gray-400 text-sm font-medium transition-all hover:border-[#c9a96e]/40 hover:text-[#c9a96e] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#2a2a2a] disabled:hover:text-gray-400"
              >
                {locale === "ar" ? "التالي" : "Next"}
              </button>
            </div>
          </div>
        )}

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
