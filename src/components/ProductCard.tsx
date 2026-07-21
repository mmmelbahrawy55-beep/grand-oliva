"use client";

import { motion } from "framer-motion";
import { useLocaleStore, useCartStore } from "@/lib/store";
import { ShoppingCart, Eye, Star, Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const addItem = useCartStore((s) => s.addItem);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const name = locale === "ar" ? product.name_ar : product.name;
  const description = locale === "ar" ? product.description_ar : product.description;
  const category = locale === "ar" ? product.category_ar : product.category;
  const badge = locale === "ar" ? product.badge_ar : product.badge;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(locale === "ar" ? "تمت الإضافة إلى السلة" : "Added to cart");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-700"
      dir={dir}
    >
      {/* Image section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-4 z-10"
          >
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-amber-500/30">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Like button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-rose-500 text-rose-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-4 left-4 right-4 z-10 flex gap-2"
        >
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg"
          >
            <Eye className="w-4 h-4" />
            {locale === "ar" ? "عرض" : "View"}
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30"
          >
            <ShoppingCart className="w-4 h-4" />
            {locale === "ar" ? "أضف" : "Add"}
          </button>
        </motion.div>
      </div>

      {/* Content section */}
      <div className="p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Origin & Weight */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            🌍 {locale === "ar" ? product.origin_ar : product.origin}
          </span>
          <span className="flex items-center gap-1">
            ⚖️ {locale === "ar" ? product.weight_ar : product.weight}
          </span>
        </div>

        {/* Price & Add to cart */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
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
