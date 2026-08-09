"use client";

import { useLocaleStore, useCartStore } from "@/lib/store";
import { X, Star, ShoppingCart, Heart, Minus, Plus, Check } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import toast from "react-hot-toast";
import { useState } from "react";

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  const name = locale === "ar" ? product.name_ar : product.name;
  const description = locale === "ar" ? product.description_ar : product.description;
  const category = locale === "ar" ? product.category_ar : product.category;
  const origin = locale === "ar" ? product.origin_ar : product.origin;
  const weight = locale === "ar" ? product.weight_ar : product.weight;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(locale === "ar" ? `تمت إضافة ${quantity} منتجات` : `Added ${quantity} items`, {
      style: { background: "#1a1a1a", color: "#fff", border: "1px solid #2a2a2a" },
    });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 z-[80] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Centering wrapper — handles position, animation handles scale/opacity */}
      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none ${isOpen ? "pointer-events-auto" : ""}`}
        dir={dir}
      >
        {/* Modal inner */}
        <div
          className={`w-full md:w-[900px] md:max-h-[80vh] bg-[#111] rounded-2xl border border-[#2a2a2a] overflow-hidden flex flex-col md:flex-row will-change-transform transition-all duration-300 ease-out ${
            isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-11 h-11 rounded-xl bg-[#0a0a0a]/90 border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-white hover:border-[#c9a96e]/30 transition-all active:scale-95"
            aria-label="Close quick view"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-[#0a0a0a]">
            <Image
              src={product.image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 450px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent md:bg-gradient-to-r" />

            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="bg-[#c9a96e] text-[#0a0a0a] text-[10px] font-bold px-4 py-1.5 rounded-lg tracking-wider uppercase">
                  {locale === "ar" ? product.badge_ar : product.badge}
                </span>
              </div>
            )}

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute bottom-4 left-4 w-11 h-11 bg-[#0a0a0a]/80 rounded-xl flex items-center justify-center border border-[#2a2a2a] hover:border-[#c9a96e]/50 transition-all active:scale-95"
              aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-500"}`} />
            </button>
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto scroll-touch">
            <span className="text-[10px] font-semibold text-[#c9a96e] tracking-[0.2em] uppercase">
              {category}
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {name}
            </h2>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => {
                  const fill = product.rating - i;
                  if (fill >= 1) return <Star key={i} className="w-4 h-4 fill-[#c9a96e] text-[#c9a96e]" />;
                  if (fill > 0) return (
                    <div key={i} className="relative w-4 h-4">
                      <Star className="absolute inset-0 w-4 h-4 text-[#2a2a2a]" />
                      <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                        <Star className="w-4 h-4 fill-[#c9a96e] text-[#c9a96e]" />
                      </div>
                    </div>
                  );
                  return <Star key={i} className="w-4 h-4 text-[#2a2a2a]" />;
                })}
              </div>
              <span className="text-gray-500 text-sm">
                {product.rating} ({product.reviews} {locale === "ar" ? "تقييم" : "reviews"})
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a]">
                <span className="text-[10px] text-gray-600 tracking-wider uppercase">{locale === "ar" ? "المصدر" : "Origin"}</span>
                <p className="text-white text-sm font-medium mt-1">{origin}</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a]">
                <span className="text-[10px] text-gray-600 tracking-wider uppercase">{locale === "ar" ? "الوزن" : "Weight"}</span>
                <p className="text-white text-sm font-medium mt-1">{weight}</p>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gold">${product.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-500 text-sm">{locale === "ar" ? "الكمية" : "Quantity"}</span>
              <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#222] transition-all active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-white text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#222] transition-all active:scale-90"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-gold w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-base active:scale-[0.98] transition-transform"
              aria-label={`Add ${name} to cart`}
            >
              <ShoppingCart className="w-5 h-5" />
              {locale === "ar" ? "أضف إلى السلة" : "Add to Cart"}
            </button>

            <div className="flex items-center gap-2 mt-4 justify-center">
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-500 text-xs">
                {locale === "ar" ? "متوفر في المخزون" : "In Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
