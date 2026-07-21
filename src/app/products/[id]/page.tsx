"use client";

import { useParams } from "next/navigation";
import { useCartStore, useLocaleStore } from "@/lib/store";
import { products } from "@/lib/data/products";
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

  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16" dir={dir}>
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
                  src={images[selectedImage]}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <button
                onClick={() => setSelectedImage((p) => (p === 0 ? images.length - 1 : p - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedImage((p) => (p === images.length - 1 ? 0 : p + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-[#c9a96e]" : "border-[#2a2a2a] hover:border-[#c9a96e]/30"
                  }`}
                >
                  <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="100px" />
                </motion.button>
              ))}
            </div>
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#c9a96e] text-[#c9a96e]" />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">
                  {product.reviews} {locale === "ar" ? "تقييم" : "reviews"}
                </span>
              </div>
              <div className="text-4xl font-bold text-gold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                ${product.price.toFixed(2)}
              </div>
            </div>

            <div className="border-t border-[#2a2a2a pt-8">
              <p className="text-gray-400 text-lg leading-relaxed mb-8">{description}</p>
            </div>

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

            <div className="border-t border-[#2a2a2a pt-8 space-y-4">
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
    </div>
  );
}
