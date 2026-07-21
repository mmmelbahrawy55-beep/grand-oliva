"use client";

import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Award, Heart } from "lucide-react";

export default function Hero() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" dir={dir}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-400 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-lime-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full px-4 py-2 mb-6"
            >
              <Leaf className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-200 text-sm font-medium">
                {locale === "ar" ? "100% طبيعي" : "100% Natural"}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif">
              {t(locale, "hero.title")}
              <span className="block text-emerald-300 mt-2">
                {t(locale, "hero.subtitle")}
              </span>
            </h1>

            <p className="text-xl text-emerald-100/80 mb-10 max-w-lg leading-relaxed">
              {t(locale, "hero.description")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 bg-white text-emerald-800 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5"
              >
                {t(locale, "hero.cta")}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border-2 border-emerald-400/50 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400/10 transition-all duration-300"
              >
                {t(locale, "hero.cta2")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-lime-400/30 rounded-3xl rotate-6 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/40 to-green-500/40 rounded-3xl -rotate-3" />
              <div className="relative bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl w-full h-full flex items-center justify-center shadow-2xl">
                <div className="text-center text-white p-8">
                  <div className="text-8xl mb-4">🫒</div>
                  <div className="text-3xl font-bold font-serif mb-2">Grand Oliva</div>
                  <div className="text-emerald-100">
                    {locale === "ar" ? "جودة لا تُضاهى" : "Unmatched Quality"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { icon: Award, title: locale === "ar" ? "جودة ممتازة" : "Premium Quality", desc: locale === "ar" ? "منتجات بأعلى معايير الجودة" : "Products with highest quality standards" },
            { icon: Leaf, title: locale === "ar" ? "طبيعي 100%" : "100% Natural", desc: locale === "ar" ? "مكونات طبيعية بدون إضافات" : "Natural ingredients with no additives" },
            { icon: Heart, title: locale === "ar" ? "صنع يدوي" : "Handcrafted", desc: locale === "ar" ? "مصنوع يدوياً بعناية فائقة" : "Handcrafted with utmost care" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-emerald-500/30 rounded-2xl flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-emerald-300" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-emerald-200/70 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
