"use client";

import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Star, Award, Leaf } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]" dir={dir}>
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1510104782-8e4e8d3a5e46?w=1920&h=1080&fit=crop&q=80"
            alt="Premium Olives Background"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent"
        />
        <motion.div
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60"
        />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 border border-[#c9a96e]/30 rounded-full px-5 py-2 mb-10"
            >
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full"
              />
              <span className="text-[#c9a96e] text-xs font-semibold tracking-[0.25em] uppercase">
                {locale === "ar" ? "منذ عام 1950" : "Since 1950"}
              </span>
            </motion.div>

            <h1 className="mb-8">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="block text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.85] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Grand
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="block text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tight text-gold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Oliva
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-[#c9a96e]/80 mb-6 font-light tracking-wide"
            >
              {locale === "ar" ? "أجود أنواع الزيتون والمخللات" : "Premium Olives & Pickles"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-gray-400 text-lg mb-12 max-w-lg leading-relaxed"
            >
              {locale === "ar"
                ? "نكهة الأصالة وجودة لا مثيل لها. منتجاتنا مصنوعة يدوياً من أجود المكونات الطبيعية المختارة بعناية من أجمل مزارع البحر الأبيض المتوسط."
                : "The taste of authenticity with unmatched quality. Our products are handcrafted from the finest natural ingredients carefully selected from the Mediterranean's most beautiful groves."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-5"
            >
              <Link
                href="/products"
                className="group btn-gold px-10 py-5 rounded-xl text-base inline-flex items-center gap-3"
              >
                {t(locale, "hero.cta")}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/about"
                className="border border-[#c9a96e]/30 text-[#c9a96e] px-10 py-5 rounded-xl text-base font-semibold hover:bg-[#c9a96e]/10 transition-all duration-300"
              >
                {locale === "ar" ? "من نحن" : "About Us"}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-14 mt-16 pt-10 border-t border-[#2a2a2a]"
            >
              {[
                { icon: Award, value: "50+", label: locale === "ar" ? "نوع منتج" : "Products" },
                { icon: Leaf, value: "100%", label: locale === "ar" ? "طبيعي" : "Natural" },
                { icon: Star, value: "4.9", label: locale === "ar" ? "تقييم" : "Rating" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-[#c9a96e]" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl">{s.value}</div>
                    <div className="text-gray-500 text-xs">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="relative w-[480px] h-[480px] rounded-3xl overflow-hidden border border-[#c9a96e]/20 gold-glow-strong"
            >
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src="https://images.unsplash.com/photo-1510104782-8e4e8d3a5e46?w=600&h=600&fit=crop&q=80"
                  alt="Premium Olives in Bowl"
                  fill
                  className="object-cover"
                  sizes="480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 right-4 bg-[#1a1a1a] border border-[#c9a96e]/30 rounded-xl px-4 py-3 gold-glow"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏆</span>
                  <div>
                    <div className="text-[#c9a96e] text-[10px] font-semibold tracking-wider uppercase">
                      {locale === "ar" ? "الأفضل" : "Award"}
                    </div>
                    <div className="text-white text-sm font-bold">2024</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 left-4 bg-[#1a1a1a] border border-[#c9a96e]/30 rounded-xl px-4 py-3 gold-glow"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🫒</span>
                  <div>
                    <div className="text-[#c9a96e] text-[10px] font-semibold tracking-wider uppercase">
                      {locale === "ar" ? "المصدر" : "Origin"}
                    </div>
                    <div className="text-white text-sm font-bold">
                      {locale === "ar" ? "البحر المتوسع" : "Mediterranean"}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border-2 border-[#c9a96e]/10 rounded-3xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">
            {locale === "ar" ? "اكتشف" : "Explore"}
          </span>
          <ChevronDown className="w-4 h-4 text-[#c9a96e]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
