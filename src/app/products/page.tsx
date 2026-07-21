"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

const allProducts: Product[] = [
  { id: "1", name: "Green Olives", name_ar: "زيتون أخضر", description: "Fresh green olives handpicked from the finest groves", description_ar: "زيتون أخضر طازج مقطوف من أشجار زيتون مميزة", price: 12.99, image: "/olive-green.jpg", category: "Olives", category_ar: "زيتون", stock: 100, featured: true, created_at: "2024-01-01" },
  { id: "2", name: "Black Olives", name_ar: "زيتون أسود", description: "Premium black olives with rich, deep flavor", description_ar: "زيتون أسود فاخر بنكهة عميقة ومميزة", price: 14.99, image: "/olive-black.jpg", category: "Olives", category_ar: "زيتون", stock: 80, featured: true, created_at: "2024-01-01" },
  { id: "3", name: "Mixed Pickles", name_ar: "مخلل مشكل", description: "A delicious mix of traditional Middle Eastern pickles", description_ar: "مزيج لذيذ من المخللات الشرقية التقليدية", price: 9.99, image: "/pickles-mixed.jpg", category: "Pickles", category_ar: "مخللات", stock: 120, featured: true, created_at: "2024-01-01" },
  { id: "4", name: "Stuffed Olives", name_ar: "زيتون محشي", description: "Olives stuffed with garlic and red pepper", description_ar: "زيتون محشي بالثوم والفلفل الأحمر", price: 16.99, image: "/olive-stuffed.jpg", category: "Olives", category_ar: "زيتون", stock: 60, featured: true, created_at: "2024-01-01" },
  { id: "5", name: "Spicy Pickles", name_ar: "مخلل حار", description: "Hot and spicy pickles for those who love heat", description_ar: "مخلل حار وحار جداً لعشاق النكهة الحارة", price: 8.99, image: "/pickles-spicy.jpg", category: "Pickles", category_ar: "مخللات", stock: 90, featured: false, created_at: "2024-01-01" },
  { id: "6", name: "Garlic Olives", name_ar: "زيتون بالثوم", description: "Olives marinated with fresh garlic and herbs", description_ar: "زيتون متبل بالثوم الطازج والأعشاب", price: 13.99, image: "/olive-garlic.jpg", category: "Olives", category_ar: "زيتون", stock: 70, featured: false, created_at: "2024-01-01" },
  { id: "7", name: "Tomato Sauce", name_ar: "صلصة طماطم", description: "Traditional tomato sauce with secret spices", description_ar: "صلصة طماطم تقليدية بهارات سرية", price: 7.99, image: "/sauce-tomato.jpg", category: "Sauces", category_ar: "صلصات", stock: 150, featured: false, created_at: "2024-01-01" },
  { id: "8", name: "Pepper Paste", name_ar: "معجون فلفل", description: "Rich red pepper paste for cooking", description_ar: "معجون فلفل أحمر غني للطبخ", price: 6.99, image: "/paste-pepper.jpg", category: "Sauces", category_ar: "صلصات", stock: 110, featured: false, created_at: "2024-01-01" },
];

const categories = [
  { key: "all", ar: "الكل", en: "All" },
  { key: "Olives", ar: "زيتون", en: "Olives" },
  { key: "Pickles", ar: "مخللات", en: "Pickles" },
  { key: "Sauces", ar: "صلصات", en: "Sauces" },
];

export default function ProductsPage() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <section className="pt-28 pb-20 bg-gray-50 min-h-screen" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            {t(locale, "products.title")}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t(locale, "products.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              {locale === "ar" ? cat.ar : cat.en}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              layout
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {locale === "ar" ? "لا توجد منتجات في هذا التصنيف" : "No products in this category"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
