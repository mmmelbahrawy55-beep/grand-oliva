"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Green Olives",
    name_ar: "زيتون أخضر",
    description: "Fresh green olives handpicked from the finest groves",
    description_ar: "زيتون أخضر طازج مقطوف من أشجار زيتون مميزة",
    price: 12.99,
    image: "/olive-green.jpg",
    category: "Olives",
    category_ar: "زيتون",
    stock: 100,
    featured: true,
    created_at: "2024-01-01",
  },
  {
    id: "2",
    name: "Black Olives",
    name_ar: "زيتون أسود",
    description: "Premium black olives with rich, deep flavor",
    description_ar: "زيتون أسود فاخر بنكهة عميقة ومميزة",
    price: 14.99,
    image: "/olive-black.jpg",
    category: "Olives",
    category_ar: "زيتون",
    stock: 80,
    featured: true,
    created_at: "2024-01-01",
  },
  {
    id: "3",
    name: "Mixed Pickles",
    name_ar: "مخلل مشكل",
    description: "A delicious mix of traditional Middle Eastern pickles",
    description_ar: "مزيج لذيذ من المخللات الشرقية التقليدية",
    price: 9.99,
    image: "/pickles-mixed.jpg",
    category: "Pickles",
    category_ar: "مخللات",
    stock: 120,
    featured: true,
    created_at: "2024-01-01",
  },
  {
    id: "4",
    name: "Stuffed Olives",
    name_ar: "زيتون محشي",
    description: "Olives stuffed with garlic and red pepper",
    description_ar: "زيتون محشي بالثوم والفلفل الأحمر",
    price: 16.99,
    image: "/olive-stuffed.jpg",
    category: "Olives",
    category_ar: "زيتون",
    stock: 60,
    featured: true,
    created_at: "2024-01-01",
  },
];

export default function FeaturedProducts() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <section className="py-24 bg-gray-50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">
            {locale === "ar" ? "تشكيلتنا المميزة" : "Our Featured Collection"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 font-serif">
            {t(locale, "products.title")}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t(locale, "products.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
          >
            {locale === "ar" ? "عرض جميع المنتجات" : "View All Products"}
            <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
