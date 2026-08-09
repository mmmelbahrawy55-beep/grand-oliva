"use client";

import { useParams } from "next/navigation";
import { useCartStore, useLocaleStore } from "@/lib/store";
import { useProducts } from "@/lib/admin-helpers";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Minus, Plus, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProductPage() {
  const params = useParams();
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const addItem = useCartStore((s) => s.addItem);
  const products = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center" dir={dir}>
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">{locale === "ar" ? "المنتج غير موجود" : "Product Not Found"}</h1>
          <Link href="/products" className="btn-gold px-8 py-4 rounded-xl">
            {locale === "ar" ? "العودة للمنتجات" : "Back to Products"}
          </Link>
        </div>
      </div>
    );
  }

  const name = locale === "ar" ? product.name_ar : product.name;
  const description = locale === "ar" ? product.description_ar : product.description;
  const category = locale === "ar" ? product.category_ar : product.category;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    toast.success(locale === "ar" ? "تمت الإضافة للسلة!" : "Added to cart!");
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && p.price > 0)
    .slice(0, 4);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => {
      const fill = rating - i;
      if (fill >= 1) {
        return <Star key={i} className="w-5 h-5 fill-[#c9a96e] text-[#c9a96e]" />;
      } else if (fill > 0) {
        return (
          <div key={i} className="relative w-5 h-5">
            <Star className="absolute inset-0 w-5 h-5 text-[#2a2a2a]" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="w-5 h-5 fill-[#c9a96e] text-[#c9a96e]" />
            </div>
          </div>
        );
      }
      return <Star key={i} className="w-5 h-5 text-[#2a2a2a]" />;
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-24 lg:pb-16" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 text-sm text-gray-500 mb-8"
        >
          <Link href="/" className="hover:text-[#c9a96e]">{locale === "ar" ? "الرئيسية" : "Home"}</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#c9a96e]">{locale === "ar" ? "المنتجات" : "Products"}</Link>
          <span>/</span>
          <span className="text-white">{name}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative mb-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#2a2a2a] gold-glow">
                <Image
                  src={product.image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#c9a96e] text-[#0a0a0a] text-[10px] font-bold px-4 py-1.5 rounded-lg tracking-wider uppercase">
                    {locale === "ar" ? product.badge_ar : product.badge}
                  </span>
                </div>
              )}
            </div>

            {relatedProducts.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm text-gray-500 mb-3 font-medium">
                  {locale === "ar" ? "منتجات مشابهة" : "Related Products"}
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {relatedProducts.map((rp) => (
                    <Link
                      key={rp.id}
                      href={`/products/${rp.id}`}
                      className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#2a2a2a] hover:border-[#c9a96e]/50 transition-all"
                    >
                      <Image
                        src={rp.image}
                        alt={locale === "ar" ? rp.name_ar : rp.name}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="text-[#c9a96e] text-xs font-semibold tracking-[0.3em] uppercase">
                {category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-500 text-sm">
                  {product.rating.toFixed(1)} ({product.reviews} {locale === "ar" ? "تقييم" : "reviews"})
                </span>
              </div>
              {product.price > 0 && (
                <div className="text-4xl font-bold text-gold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ${product.price.toFixed(2)}
                </div>
              )}
            </div>

            <div className="border-t border-[#2a2a2a] pt-8">
              <p className="text-gray-400 text-lg leading-relaxed mb-8">{description}</p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111] border border-[#2a2a2a]">
                  <span>🌍</span>
                  <span>{locale === "ar" ? product.origin_ar : product.origin}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111] border border-[#2a2a2a]">
                  <span>⚖️</span>
                  <span>{locale === "ar" ? product.weight_ar : product.weight}</span>
                </div>
                {product.stock > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111] border border-[#2a2a2a]">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span>{locale === "ar" ? "متوفر" : "In Stock"}</span>
                  </div>
                )}
              </div>
            </div>

            {product.price > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-[#2a2a2a] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-[#1a1a1a] text-gray-400 hover:text-[#c9a96e] hover:bg-[#2a2a2a] transition-all flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 h-12 flex items-center justify-center text-white font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-[#1a1a1a] text-gray-400 hover:text-[#c9a96e] hover:bg-[#2a2a2a] transition-all flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-gold py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-3"
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        {locale === "ar" ? "تمت الإضافة" : "Added!"}
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        {locale === "ar" ? "أضف للسلة" : "Add to Cart"}
                      </>
                    )}
                  </button>
                  <button className="w-12 h-12 border border-[#2a2a2a] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 border border-[#2a2a2a] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            <div className="border-t border-[#2a2a2a] pt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <Check className="w-5 h-5 text-[#c9a96e]" />
                <span>{locale === "ar" ? "توصيل مجاني فوق 50$" : "Free shipping over $50"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Check className="w-5 h-5 text-[#c9a96e]" />
                <span>{locale === "ar" ? "ضمان جودة 100%" : "100% Quality Guarantee"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Check className="w-5 h-5 text-[#c9a96e]" />
                <span>{locale === "ar" ? "دعم 24/7" : "24/7 Customer Support"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {product.price > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-[#2a2a2a] safe-area-bottom">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex-1">
              <div className="text-[#c9a96e] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                ${product.price.toFixed(2)}
              </div>
              <div className="text-gray-500 text-xs">
                {locale === "ar" ? "شامل الضريبة" : "Tax included"}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-gold px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 flex-shrink-0"
            >
              <ShoppingCart className="w-4 h-4" />
              {locale === "ar" ? "أضف للسلة" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
