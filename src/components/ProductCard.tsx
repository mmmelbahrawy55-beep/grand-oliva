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
  const [isLiked, setIsLiked] = useState(false);

  const name = locale === "ar" ? product.name_ar : product.name;
  const description = locale === "ar" ? product.description_ar : product.description;
  const category = locale === "ar" ? product.category_ar : product.category;
  const badge = locale === "ar" ? product.badge_ar : product.badge;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(locale === "ar" ? "تمت الإضافة إلى السلة" : "Added to cart", {
      style: { background: "#1a1a1a", color: "#fff", border: "1px solid #2a2a2a" },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group card-luxury rounded-2xl overflow-hidden"
      dir={dir}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#c9a96e] text-[#0a0a0a] text-[10px] font-bold px-4 py-1.5 rounded-lg tracking-wider uppercase">
              {badge}
            </span>
          </div>
        )}

        {/* Like */}
        <button
          onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#0a0a0a]/60 backdrop-blur-sm rounded-lg flex items-center justify-center border border-[#2a2a2a] hover:border-[#c9a96e]/50 transition-all"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-500"}`} />
        </button>

        {/* Quick actions */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-[#2a2a2a] hover:border-[#c9a96e]/50 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            {locale === "ar" ? "عرض" : "View"}
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-gold py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {locale === "ar" ? "أضف" : "Add"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold text-[#c9a96e] tracking-wider uppercase">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#c9a96e] text-[#c9a96e]" />
            <span className="text-xs text-gray-400">{product.rating}</span>
            <span className="text-[10px] text-gray-600">({product.reviews})</span>
          </div>
        </div>

        <h3 className="font-bold text-white mb-2 group-hover:text-[#c9a96e] transition-colors line-clamp-1">
          {name}
        </h3>

        <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-3 text-[10px] text-gray-600 mb-4">
          <span>🌍 {locale === "ar" ? product.origin_ar : product.origin}</span>
          <span className="w-px h-3 bg-[#2a2a2a]" />
          <span>⚖️ {locale === "ar" ? product.weight_ar : product.weight}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
          <span className="text-2xl font-bold text-gold">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
