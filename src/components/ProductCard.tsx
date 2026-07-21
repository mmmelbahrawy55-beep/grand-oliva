"use client";

import { motion } from "framer-motion";
import { useLocaleStore, useCartStore } from "@/lib/store";
import { ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import toast from "react-hot-toast";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const addItem = useCartStore((s) => s.addItem);

  const name = locale === "ar" ? product.name_ar : product.name;
  const description = locale === "ar" ? product.description_ar : product.description;
  const category = locale === "ar" ? product.category_ar : product.category;

  const handleAddToCart = () => {
    addItem(product);
    toast.success(locale === "ar" ? "تمت الإضافة إلى السلة" : "Added to cart");
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500"
      dir={dir}
    >
      <div className="relative aspect-square bg-gradient-to-br from-emerald-50 to-green-50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl group-hover:scale-110 transition-transform duration-500">🫒</span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link
            href={`/products/${product.id}`}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white transition-colors"
          >
            <Eye className="w-5 h-5 text-emerald-700" />
          </Link>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
          {name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-emerald-700">${product.price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
