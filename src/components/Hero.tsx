"use client";

import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Award, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

function FloatingOrb({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: "radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)",
        filter: "blur(1px)",
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration: 8 + delay * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function GoldParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: `${10 + Math.random() * 80}%`,
    y: `${10 + Math.random() * 80}%`,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 4,
  }));

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: "rgba(201,169,110,0.6)",
          }}
          animate={{
            y: [0, -40, -20, -60, 0],
            x: [0, 10, -10, 5, 0],
            opacity: [0, 0.8, 0.4, 0.9, 0],
            scale: [0.5, 1.2, 0.8, 1, 0.5],
          }}
          transition={{
            duration: 6 + p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </>
  );
}

export default function Hero() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={sectionRef} className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Animated Background Image with Ken Burns */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-[-5%] w-[110%] h-[110%]"
          animate={{
            scale: [1, 1.08, 1.04, 1.1, 1],
            x: [0, -15, 10, -5, 0],
            y: [0, -10, 5, -15, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="https://images.pexels.com/photos/4109911/pexels-photo-4109911.jpeg?w=1920&h=1080&fit=crop&q=75"
            alt=""
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />

      {/* Animated Gold Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb delay={0} x="15%" y="20%" size={200} />
        <FloatingOrb delay={2} x="70%" y="60%" size={150} />
        <FloatingOrb delay={4} x="85%" y="15%" size={120} />
        <FloatingOrb delay={1} x="5%" y="70%" size={180} />
        <FloatingOrb delay={3} x="50%" y="10%" size={100} />
      </div>

      {/* Floating Gold Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GoldParticles />
      </div>

      {/* Animated Gold Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-2/3 left-0 w-full h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)" }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Desktop layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32 w-full hidden lg:block">
        <motion.div style={{ y: textY }}>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 border border-[#c9a96e]/20 rounded-full px-5 py-2.5 mb-10"
              >
                <motion.span
                  className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Sparkles className="w-3.5 h-3.5 text-[#c9a96e]/60" />
                <span className="text-[#c9a96e] text-[11px] font-semibold tracking-[0.25em] uppercase">
                  {locale === "ar" ? "منذ عام ١٩٥٠" : "Since 1950"}
                </span>
              </motion.div>

              {/* Title with character reveal */}
              <h1 className="mb-8">
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-[7rem] font-bold text-white leading-[0.9] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Grand
                  </motion.span>
                </div>
                <div className="overflow-hidden mt-1">
                  <motion.span
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-[7rem] font-bold leading-[0.9] tracking-tight text-gold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Oliva
                  </motion.span>
                </div>
              </h1>

              {/* Animated gold line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-[2px] bg-gradient-to-r from-[#c9a96e] to-transparent mb-8"
              />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-2xl text-[#c9a96e]/80 mb-6 font-light tracking-wide"
              >
                {locale === "ar" ? "أجود أنواع الزيتون والمخللات" : "Premium Olives & Pickles"}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-gray-400 text-lg mb-12 max-w-lg leading-relaxed"
              >
                {locale === "ar"
                  ? "نكهة الأصالة وجودة لا مثيل لها. منتجاتنا مصنوعة يدوياً من أجود المكونات الطبيعية المختارة بعناية من أجمل مزارع البحر الأبيض المتوسط."
                  : "The taste of authenticity with unmatched quality. Our products are handcrafted from the finest natural ingredients carefully selected from the Mediterranean's most beautiful groves."}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex gap-5 mb-14"
              >
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/products"
                    className="group px-10 py-5 rounded-2xl text-base font-semibold inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#c9a96e] to-[#b8985d] text-[#0a0a0a] shadow-[0_0_30px_rgba(201,169,110,0.3)] hover:shadow-[0_0_50px_rgba(201,169,110,0.5)] transition-shadow duration-500"
                  >
                    <span>{t(locale, "hero.cta")}</span>
                    <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/about"
                    className="border border-[#c9a96e]/25 text-[#c9a96e] px-10 py-5 rounded-2xl text-base font-semibold hover:bg-[#c9a96e]/[0.08] hover:border-[#c9a96e]/50 transition-all duration-300"
                  >
                    {locale === "ar" ? "من نحن" : "About Us"}
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex gap-12 pt-10 border-t border-[#2a2a2a]/60"
              >
                {[
                  { icon: Award, value: "42+", label: locale === "ar" ? "نوع منتج" : "Products" },
                  { icon: Leaf, value: "100%", label: locale === "ar" ? "طبيعي" : "Natural" },
                  { icon: Star, value: "4.9", label: locale === "ar" ? "تقييم" : "Rating" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/[0.08] border border-[#c9a96e]/10 flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-[#c9a96e]" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">{s.value}</div>
                      <div className="text-gray-500 text-[11px] tracking-wider uppercase">{s.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Product Image with glow animation */}
            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Animated glow ring */}
                <motion.div
                  className="absolute -inset-3 rounded-[2.5rem] opacity-50"
                  style={{
                    background: "linear-gradient(135deg, rgba(201,169,110,0.2), transparent, rgba(201,169,110,0.1))",
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                  className="relative w-[460px] h-[460px] rounded-[2rem] overflow-hidden border border-[#c9a96e]/15 shadow-gold-glow"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image src="/product-images/product-51.jpg" alt="Premium Olives" fill className="object-cover" sizes="460px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />

                  {/* Floating badge */}
                  <motion.div
                    className="absolute top-5 right-5 bg-[#0a0a0a]/80 border border-[#c9a96e]/25 rounded-2xl px-4 py-3 backdrop-blur-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(201,169,110,0.5)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🏆</span>
                      <div className="text-[#c9a96e] text-[10px] font-semibold tracking-wider uppercase">{locale === "ar" ? "الأفضل" : "Premium"}</div>
                    </div>
                  </motion.div>

                  {/* Origin badge */}
                  <motion.div
                    className="absolute bottom-5 left-5 bg-[#0a0a0a]/80 border border-[#c9a96e]/25 rounded-2xl px-4 py-3 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(201,169,110,0.5)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🫒</span>
                      <div>
                        <div className="text-[#c9a96e] text-[10px] font-semibold tracking-wider uppercase">{locale === "ar" ? "المصدر" : "Origin"}</div>
                        <div className="text-white text-sm font-bold">{locale === "ar" ? "البحر المتوسط" : "Mediterranean"}</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile/Tablet layout */}
      <div className="relative w-full lg:hidden px-5 pt-24 pb-10 flex flex-col items-center text-center min-h-[100dvh] justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-[#c9a96e]/20 rounded-full px-4 py-2 mb-6"
        >
          <motion.span
            className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Sparkles className="w-3 h-3 text-[#c9a96e]/60" />
          <span className="text-[#c9a96e] text-[10px] font-semibold tracking-[0.25em] uppercase">
            {locale === "ar" ? "منذ عام ١٩٥٠" : "Since 1950"}
          </span>
        </motion.div>

        <h1 className="mb-4">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[4rem] sm:text-[5.5rem] font-bold text-white leading-[0.85] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Grand
            </motion.span>
          </div>
          <div className="overflow-hidden mt-1">
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[4rem] sm:text-[5.5rem] font-bold leading-[0.85] tracking-tight text-gold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Oliva
            </motion.span>
          </div>
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mb-4"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-[#c9a96e]/80 text-base font-light tracking-wide mb-3"
        >
          {locale === "ar" ? "أجود أنواع الزيتون والمخللات" : "Premium Olives & Pickles"}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-gray-400 text-sm mb-6 max-w-sm leading-relaxed"
        >
          {locale === "ar" ? "نكهة الأصالة وجودة لا مثيل لها" : "The taste of authenticity with unmatched quality"}
        </motion.p>

        {/* Mobile Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-[2rem] overflow-hidden border border-[#c9a96e]/15 shadow-gold-glow">
            <Image src="/product-images/product-51.jpg" alt="Premium Olives" fill className="object-cover" sizes="320px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            <motion.div
              className="absolute top-3 right-3 bg-[#0a0a0a]/80 border border-[#c9a96e]/25 rounded-xl px-3 py-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🏆</span>
                <div className="text-[#c9a96e] text-[9px] font-semibold tracking-wider uppercase">{locale === "ar" ? "الأفضل" : "Premium"}</div>
              </div>
            </motion.div>
            <motion.div
              className="absolute bottom-3 left-3 bg-[#0a0a0a]/80 border border-[#c9a96e]/25 rounded-xl px-3 py-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🫒</span>
                <div>
                  <div className="text-[#c9a96e] text-[9px] font-semibold tracking-wider uppercase">{locale === "ar" ? "المصدر" : "Origin"}</div>
                  <div className="text-white text-xs font-bold">{locale === "ar" ? "البحر المتوسط" : "Mediterranean"}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col gap-3 w-full max-w-sm mb-8"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/products"
              className="px-8 py-4 rounded-2xl text-base font-semibold inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#c9a96e] to-[#b8985d] text-[#0a0a0a] shadow-[0_0_30px_rgba(201,169,110,0.3)] w-full"
            >
              <span>{t(locale, "hero.cta")}</span>
              <ArrowRight className={`w-5 h-5 ${dir === "rtl" ? "rotate-180" : ""}`} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/about"
              className="border border-[#c9a96e]/25 text-[#c9a96e] px-8 py-4 rounded-2xl text-base font-semibold text-center block hover:bg-[#c9a96e]/[0.08] transition-all"
            >
              {locale === "ar" ? "من نحن" : "About Us"}
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center gap-8 pt-6 border-t border-[#2a2a2a]/60"
        >
          {[
            { icon: Award, value: "42+", label: locale === "ar" ? "منتج" : "Products" },
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
        </motion.div>
      </div>
    </section>
  );
}
