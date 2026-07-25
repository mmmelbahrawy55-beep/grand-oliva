"use client";

import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Star, Award, Leaf, Sparkles } from "lucide-react";
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
  const showcaseY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] sm:min-h-screen flex items-center overflow-hidden bg-[#0a0a0a] animated-gradient noise-overlay">
      {/* Premium background layers */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/4109911/pexels-photo-4109911.jpeg?w=1920&h=1080&fit=crop&q=80"
            alt="Premium Olives Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"
        />
        <motion.div
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/70"
        />
      </motion.div>

      {/* Premium glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-80 h-80 bg-[#c9a96e]/5 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[15%] w-64 h-64 bg-[#c9a96e]/4 rounded-full blur-[60px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[50%] right-[40%] w-96 h-96 bg-[#c9a96e]/3 rounded-full blur-[100px]"
        />

        {/* Floating decorative olives */}
        <span className="absolute top-[18%] right-[8%] text-5xl opacity-[0.06] float-slow hidden sm:block">🫒</span>
        <span className="absolute bottom-[25%] left-[3%] text-4xl opacity-[0.04] float-medium hidden sm:block">🫒</span>
        <span className="absolute top-[55%] right-[15%] text-3xl opacity-[0.03] float-fast hidden md:block">🫒</span>
        <span className="absolute top-[35%] left-[20%] text-2xl opacity-[0.04] float-slow hidden lg:block">🫒</span>
      </div>

      {/* Top golden line */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent"
      />

      {/* Main content — always 2-column: text LEFT, image RIGHT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32 w-full">
        <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_460px] gap-4 sm:gap-10 lg:gap-20 items-center">

          {/* Text Content */}
          <motion.div style={{ y: textY }} className="min-w-0">
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 border border-[#c9a96e]/20 rounded-full px-3 sm:px-5 py-1.5 sm:py-2.5 mb-4 sm:mb-10 bg-[#c9a96e]/[0.03] backdrop-blur-sm"
            >
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full"
              />
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c9a96e]/60" />
              <span className="text-[#c9a96e] text-[9px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase">
                {locale === "ar" ? "منذ عام ١٩٥٠" : "Since 1950"}
              </span>
            </motion.div>

            {/* Main heading — compact on mobile */}
            <h1 className="mb-3 sm:mb-8">
              <motion.div className="overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold text-white leading-[0.9] tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Grand
                </motion.span>
              </motion.div>
              <motion.div className="overflow-hidden mt-0.5 sm:mt-1">
                <motion.span
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.9] tracking-tight text-shimmer"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Oliva
                </motion.span>
              </motion.div>
            </h1>

            {/* Gold accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] bg-gradient-to-r from-[#c9a96e] to-transparent mb-3 sm:mb-8"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-sm sm:text-xl md:text-2xl text-[#c9a96e]/80 mb-2 sm:mb-6 font-light tracking-wide"
            >
              {locale === "ar" ? "أجود أنواع الزيتون والمخللات" : "Premium Olives & Pickles"}
            </motion.p>

            {/* Description — hidden on very small, shown sm+ */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="hidden sm:block text-gray-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-lg leading-relaxed"
            >
              {locale === "ar"
                ? "نكهة الأصالة وجودة لا مثيل لها. منتجاتنا مصنوعة يدوياً من أجود المكونات الطبيعية المختارة بعناية من أجمل مزارع البحر الأبيض المتوسط."
                : "The taste of authenticity with unmatched quality. Our products are handcrafted from the finest natural ingredients carefully selected from the Mediterranean's most beautiful groves."}
            </motion.p>

            {/* CTA Buttons — compact on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-5 mb-6 sm:mb-14"
            >
              <Link
                href="/products"
                className="group magnetic-btn relative overflow-hidden px-6 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto text-center bg-gradient-to-r from-[#c9a96e] to-[#b8985d] text-[#0a0a0a] shadow-[0_0_30px_rgba(201,169,110,0.3)] hover:shadow-[0_0_40px_rgba(201,169,110,0.5)] transition-shadow duration-500"
              >
                <span className="relative z-10">{t(locale, "hero.cta")}</span>
                <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/about"
                className="magnetic-btn border border-[#c9a96e]/25 text-[#c9a96e] px-6 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold hover:bg-[#c9a96e]/[0.08] hover:border-[#c9a96e]/40 transition-all duration-500 w-full sm:w-auto text-center backdrop-blur-sm"
              >
                {locale === "ar" ? "من نحن" : "About Us"}
              </Link>
            </motion.div>

            {/* Stats row — hidden on mobile, shown sm+ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="hidden sm:flex flex-wrap justify-start gap-8 sm:gap-12 pt-8 sm:pt-10 border-t border-[#2a2a2a]/60"
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
                  transition={{ delay: 1.3 + i * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/[0.08] border border-[#c9a96e]/10 flex items-center justify-center">
                    <s.icon className="w-4.5 h-4.5 text-[#c9a96e]" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{s.value}</div>
                    <div className="text-gray-500 text-[11px] tracking-wider uppercase">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Showcase Image — always right side, compact on mobile */}
          <motion.div
            style={{ y: showcaseY }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Glow behind image */}
              <div className="absolute -inset-4 sm:-inset-8 bg-[#c9a96e]/[0.06] rounded-[1.2rem] sm:rounded-[2rem] blur-xl sm:blur-2xl" />

              {/* Main image container */}
              <div className="relative w-[130px] h-[160px] sm:w-[260px] sm:h-[260px] md:w-[340px] md:h-[340px] lg:w-[460px] lg:h-[460px] rounded-2xl sm:rounded-[2rem] overflow-hidden border border-[#c9a96e]/15 shadow-gold-glow">
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="https://images.pexels.com/photos/4109913/pexels-photo-4109913.jpeg?w=800&h=800&fit=crop&q=85"
                    alt="Premium Olives in Bowl"
                    fill
                    className="object-cover"
                    sizes="130px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
                </motion.div>

                {/* Award badge — compact on mobile */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-2 right-2 sm:top-5 sm:right-5 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#c9a96e]/25 rounded-lg sm:rounded-2xl px-2 py-1 sm:px-4 sm:py-3 shadow-premium"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-lg">🏆</span>
                    <div className="text-[#c9a96e] text-[7px] sm:text-[10px] font-semibold tracking-wider uppercase">
                      {locale === "ar" ? "الأفضل" : "Premium"}
                    </div>
                  </div>
                </motion.div>

                {/* Origin badge — compact on mobile */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute bottom-2 left-2 sm:bottom-5 sm:left-5 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#c9a96e]/25 rounded-lg sm:rounded-2xl px-2 py-1 sm:px-4 sm:py-3 shadow-premium"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-lg">🫒</span>
                    <div>
                      <div className="text-[#c9a96e] text-[7px] sm:text-[10px] font-semibold tracking-wider uppercase">
                        {locale === "ar" ? "المصدر" : "Origin"}
                      </div>
                      <div className="text-white text-[8px] sm:text-sm font-bold">
                        {locale === "ar" ? "البحر المتوسط" : "Mediterranean"}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Pulsing border */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 border border-[#c9a96e]/10 rounded-2xl sm:rounded-[2rem] pointer-events-none"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Premium scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 sm:gap-3"
        >
          <span className="text-gray-600 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-medium">
            {locale === "ar" ? "اكتشف" : "Scroll"}
          </span>
          <div className="w-4 h-7 sm:w-5 sm:h-8 rounded-full border border-[#c9a96e]/20 flex items-start justify-center p-1 sm:p-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 h-1.5 sm:w-1 sm:h-1.5 rounded-full bg-[#c9a96e]/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
