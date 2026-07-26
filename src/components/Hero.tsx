"use client";

import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Award, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function Hero() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/4109911/pexels-photo-4109911.jpeg?w=1920&h=1080&fit=crop&q=75"
          alt=""
          fill
          className="object-cover opacity-25"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />

      {/* Desktop layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32 w-full hidden lg:block">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="inline-flex items-center gap-2.5 border border-[#c9a96e]/20 rounded-full px-5 py-2.5 mb-10">
              <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />
              <Sparkles className="w-3.5 h-3.5 text-[#c9a96e]/60" />
              <span className="text-[#c9a96e] text-[11px] font-semibold tracking-[0.25em] uppercase">
                {locale === "ar" ? "منذ عام ١٩٥٠" : "Since 1950"}
              </span>
            </motion.div>

            <h1 className="mb-8">
              <motion.div className="overflow-hidden">
                <motion.span {...fadeUp} transition={{ delay: 0.15, duration: 0.5 }} className="block text-[7rem] font-bold text-white leading-[0.9] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Grand
                </motion.span>
              </motion.div>
              <motion.div className="overflow-hidden mt-1">
                <motion.span {...fadeUp} transition={{ delay: 0.25, duration: 0.5 }} className="block text-[7rem] font-bold leading-[0.9] tracking-tight text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Oliva
                </motion.span>
              </motion.div>
            </h1>

            <div className="w-16 h-[2px] bg-gradient-to-r from-[#c9a96e] to-transparent mb-8" />

            <motion.p {...fadeUp} transition={{ delay: 0.35, duration: 0.5 }} className="text-2xl text-[#c9a96e]/80 mb-6 font-light tracking-wide">
              {locale === "ar" ? "أجود أنواع الزيتون والمخللات" : "Premium Olives & Pickles"}
            </motion.p>

            <motion.p {...fadeUp} transition={{ delay: 0.4, duration: 0.5 }} className="text-gray-400 text-lg mb-12 max-w-lg leading-relaxed">
              {locale === "ar"
                ? "نكهة الأصالة وجودة لا مثيل لها. منتجاتنا مصنوعة يدوياً من أجود المكونات الطبيعية المختارة بعناية من أجمل مزارع البحر الأبيض المتوسط."
                : "The taste of authenticity with unmatched quality. Our products are handcrafted from the finest natural ingredients carefully selected from the Mediterranean's most beautiful groves."}
            </motion.p>

            <motion.div {...fadeUp} transition={{ delay: 0.5, duration: 0.5 }} className="flex gap-5 mb-14">
              <Link href="/products" className="group px-10 py-5 rounded-2xl text-base font-semibold inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#c9a96e] to-[#b8985d] text-[#0a0a0a] shadow-[0_0_30px_rgba(201,169,110,0.3)]">
                <span>{t(locale, "hero.cta")}</span>
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </Link>
              <Link href="/about" className="border border-[#c9a96e]/25 text-[#c9a96e] px-10 py-5 rounded-2xl text-base font-semibold hover:bg-[#c9a96e]/[0.08] transition-all duration-300">
                {locale === "ar" ? "من نحن" : "About Us"}
              </Link>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.6, duration: 0.5 }} className="flex gap-12 pt-10 border-t border-[#2a2a2a]/60">
              {[
                { icon: Award, value: "50+", label: locale === "ar" ? "نوع منتج" : "Products" },
                { icon: Leaf, value: "100%", label: locale === "ar" ? "طبيعي" : "Natural" },
                { icon: Star, value: "4.9", label: locale === "ar" ? "تقييم" : "Rating" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/[0.08] border border-[#c9a96e]/10 flex items-center justify-center">
                    <s.icon className="w-4 h-4 text-[#c9a96e]" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{s.value}</div>
                    <div className="text-gray-500 text-[11px] tracking-wider uppercase">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative w-[460px] h-[460px] rounded-[2rem] overflow-hidden border border-[#c9a96e]/15 shadow-gold-glow">
                <Image src="https://images.pexels.com/photos/4109913/pexels-photo-4109913.jpeg?w=800&h=800&fit=crop&q=80" alt="Premium Olives" fill className="object-cover" sizes="460px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
                <div className="absolute top-5 right-5 bg-[#0a0a0a]/80 border border-[#c9a96e]/25 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏆</span>
                    <div className="text-[#c9a96e] text-[10px] font-semibold tracking-wider uppercase">{locale === "ar" ? "الأفضل" : "Premium"}</div>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 bg-[#0a0a0a]/80 border border-[#c9a96e]/25 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🫒</span>
                    <div>
                      <div className="text-[#c9a96e] text-[10px] font-semibold tracking-wider uppercase">{locale === "ar" ? "المصدر" : "Origin"}</div>
                      <div className="text-white text-sm font-bold">{locale === "ar" ? "البحر المتوسط" : "Mediterranean"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet layout */}
      <div className="relative w-full lg:hidden px-5 pt-24 pb-10 flex flex-col items-center text-center min-h-[100dvh] justify-center">
        <div className="inline-flex items-center gap-2 border border-[#c9a96e]/20 rounded-full px-4 py-2 mb-6">
          <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />
          <Sparkles className="w-3 h-3 text-[#c9a96e]/60" />
          <span className="text-[#c9a96e] text-[10px] font-semibold tracking-[0.25em] uppercase">
            {locale === "ar" ? "منذ عام ١٩٥٠" : "Since 1950"}
          </span>
        </div>

        <h1 className="mb-4">
          <motion.div className="overflow-hidden">
            <motion.span {...fadeUp} transition={{ delay: 0.1, duration: 0.4 }} className="block text-[4rem] sm:text-[5.5rem] font-bold text-white leading-[0.85] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Grand
            </motion.span>
          </motion.div>
          <motion.div className="overflow-hidden mt-1">
            <motion.span {...fadeUp} transition={{ delay: 0.2, duration: 0.4 }} className="block text-[4rem] sm:text-[5.5rem] font-bold leading-[0.85] tracking-tight text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Oliva
            </motion.span>
          </motion.div>
        </h1>

        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mb-4" />

        <motion.p {...fadeUp} transition={{ delay: 0.3, duration: 0.4 }} className="text-[#c9a96e]/80 text-base font-light tracking-wide mb-3">
          {locale === "ar" ? "أجود أنواع الزيتون والمخللات" : "Premium Olives & Pickles"}
        </motion.p>

        <motion.p {...fadeUp} transition={{ delay: 0.35, duration: 0.4 }} className="text-gray-400 text-sm mb-6 max-w-sm leading-relaxed">
          {locale === "ar" ? "نكهة الأصالة وجودة لا مثيل لها" : "The taste of authenticity with unmatched quality"}
        </motion.p>

        <div className="relative mb-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative">
            <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-[2rem] overflow-hidden border border-[#c9a96e]/15 shadow-gold-glow">
              <Image src="https://images.pexels.com/photos/4109913/pexels-photo-4109913.jpeg?w=600&h=600&fit=crop&q=80" alt="Premium Olives" fill className="object-cover" sizes="320px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 bg-[#0a0a0a]/80 border border-[#c9a96e]/25 rounded-xl px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🏆</span>
                  <div className="text-[#c9a96e] text-[9px] font-semibold tracking-wider uppercase">{locale === "ar" ? "الأفضل" : "Premium"}</div>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-[#0a0a0a]/80 border border-[#c9a96e]/25 rounded-xl px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🫒</span>
                  <div>
                    <div className="text-[#c9a96e] text-[9px] font-semibold tracking-wider uppercase">{locale === "ar" ? "المصدر" : "Origin"}</div>
                    <div className="text-white text-xs font-bold">{locale === "ar" ? "البحر المتوسط" : "Mediterranean"}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp} transition={{ delay: 0.5, duration: 0.4 }} className="flex flex-col gap-3 w-full max-w-sm mb-8">
          <Link href="/products" className="px-8 py-4 rounded-2xl text-base font-semibold inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#c9a96e] to-[#b8985d] text-[#0a0a0a] shadow-[0_0_30px_rgba(201,169,110,0.3)]">
            <span>{t(locale, "hero.cta")}</span>
            <ArrowRight className={`w-5 h-5 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </Link>
          <Link href="/about" className="border border-[#c9a96e]/25 text-[#c9a96e] px-8 py-4 rounded-2xl text-base font-semibold text-center">
            {locale === "ar" ? "من نحن" : "About Us"}
          </Link>
        </motion.div>

        <div className="flex justify-center gap-8 pt-6 border-t border-[#2a2a2a]/60">
          {[
            { icon: Award, value: "50+", label: locale === "ar" ? "منتج" : "Products" },
            { icon: Leaf, value: "100%", label: locale === "ar" ? "طبيعي" : "Natural" },
            { icon: Star, value: "4.9", label: locale === "ar" ? "تقييم" : "Rating" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-lg bg-[#c9a96e]/[0.08] border border-[#c9a96e]/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-[#c9a96e]" />
              </div>
              <div className="text-white font-bold text-base">{s.value}</div>
              <div className="text-gray-500 text-[10px] tracking-wider uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
