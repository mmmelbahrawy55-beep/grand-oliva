"use client";

import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" dir={dir}>
      {/* Background with parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-green-900 to-teal-900" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-lime-400/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
      </motion.div>

      <motion.div style={{ opacity, scale }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md border border-emerald-400/20 rounded-full px-5 py-2.5 mb-8"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300 text-sm font-medium tracking-wide">
                {locale === "ar" ? "100% طبيعي وعضوي" : "100% Natural & Organic"}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="block"
              >
                {t(locale, "hero.title")}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-400 mt-2"
              >
                {t(locale, "hero.subtitle")}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-emerald-100/70 mb-10 max-w-lg leading-relaxed"
            >
              {t(locale, "hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-3 bg-white text-emerald-900 px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-lime-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">{t(locale, "hero.cta")}</span>
                <ArrowRight className={`relative w-5 h-5 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border-2 border-emerald-400/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400/10 hover:border-emerald-400/50 transition-all duration-300"
              >
                {t(locale, "hero.cta2")}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex gap-10 mt-14"
            >
              {[
                { value: "50+", label: locale === "ar" ? "نوع زيتون" : "Olive Types" },
                { value: "25+", label: locale === "ar" ? "دولة" : "Countries" },
                { value: "10K+", label: locale === "ar" ? "عميل سعيد" : "Happy Clients" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-emerald-300/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative hidden lg:block perspective-[1200px]"
          >
            {/* 3D Card Stack */}
            <div className="relative w-full aspect-square max-w-lg mx-auto" style={{ transformStyle: "preserve-3d" }}>
              {/* Background cards for depth */}
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 bg-gradient-to-br from-emerald-400/20 to-lime-400/20 rounded-[2rem] backdrop-blur-sm border border-white/10"
                style={{ transform: "translateZ(-100px) rotateY(10deg)" }}
              />
              <motion.div
                animate={{ rotate: [0, -3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-2 bg-gradient-to-br from-emerald-500/30 to-green-500/30 rounded-[2rem] backdrop-blur-sm border border-white/10"
                style={{ transform: "translateZ(-50px) rotateY(-5deg)" }}
              />
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-gradient-to-br from-emerald-500/40 to-green-600/40 rounded-[2rem] w-full h-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-center text-white p-8" style={{ transform: "translateZ(30px)" }}>
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-[120px] mb-4 leading-none"
                  >
                    🫒
                  </motion.div>
                  <div className="text-4xl font-bold font-serif mb-3 tracking-tight">Grand Oliva</div>
                  <div className="text-emerald-200/80 text-lg">
                    {locale === "ar" ? "جودة لا تُضاهى" : "Unmatched Quality"}
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-3 h-3 bg-emerald-300 rounded-full animate-ping" />
                  <div className="absolute bottom-8 left-8 w-2 h-2 bg-lime-300 rounded-full animate-pulse" />
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-emerald-300/50 text-xs tracking-widest uppercase">
            {locale === "ar" ? "اكتشف المزيد" : "Scroll to explore"}
          </span>
          <ChevronDown className="w-5 h-5 text-emerald-300/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
