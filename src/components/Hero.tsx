"use client";

import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" dir={dir}>
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-full px-5 py-2.5 mb-8"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-300 text-sm font-medium tracking-wide">
                  {locale === "ar" ? "100% طبيعي وعضوي" : "100% Natural & Organic"}
                </span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9] tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="block"
                >
                  Grand
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-400"
                >
                  Oliva
                </motion.span>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-2xl md:text-3xl text-emerald-200/90 font-serif mb-6"
              >
                {locale === "ar" ? "أجود أنواع الزيتون والمخللات الطبيعية" : "The Finest Olives & Pickles"}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed"
              >
                {locale === "ar"
                  ? "نقدم لكم أجود منتجات الزيتون والمخللات المصنوعة يدوياً بأجود المكونات الطبيعية من أجمل مزارع البحر الأبيض المتوسط"
                  : "We bring you the finest handcrafted olives and pickles made with the best natural ingredients from the beautiful Mediterranean groves"}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/products"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative">{t(locale, "hero.cta")}</span>
                  <ArrowRight className={`relative w-5 h-5 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  {locale === "ar" ? "شاهد القصة" : "Watch Story"}
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex gap-12 mt-16"
              >
                {[
                  { value: "50+", label: locale === "ar" ? "نوع زيتون" : "Olive Varieties" },
                  { value: "25+", label: locale === "ar" ? "دولة حول العالم" : "Countries" },
                  { value: "10K+", label: locale === "ar" ? "عميل سعيد" : "Happy Clients" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <div className="text-4xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-emerald-300/70 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto" style={{ perspective: "1200px" }}>
              {/* Rotating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-emerald-400/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border border-emerald-400/10 rounded-full"
              />

              {/* Main 3D Card */}
              <motion.div
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                  rotateX: [0, 3, 0, -3, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-12 bg-gradient-to-br from-emerald-600/90 to-green-700/90 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Inner content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[100px] mb-4"
                  >
                    🫒
                  </motion.div>
                  <div className="text-3xl font-bold font-serif mb-2 text-center">Grand Oliva</div>
                  <div className="text-emerald-200/80 text-center text-sm">
                    {locale === "ar" ? "جودة لا تُضاهى منذ 1950" : "Unmatched Quality Since 1950"}
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-300/50" />
                    <div className="w-3 h-3 rounded-full bg-lime-300/50" />
                    <div className="w-3 h-3 rounded-full bg-teal-300/50" />
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <div className="text-xs text-gray-500">{locale === "ar" ? "الأكثر مبيعاً" : "Best Seller"}</div>
                    <div className="font-bold text-gray-900">2024</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="text-xs text-gray-500">{locale === "ar" ? "تقييم العملاء" : "Customer Rating"}</div>
                    <div className="font-bold text-gray-900">4.9/5.0</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase">
            {locale === "ar" ? "اكتشف المزيد" : "Scroll to explore"}
          </span>
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
