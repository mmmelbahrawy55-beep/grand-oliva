"use client";

import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Gallery from "@/components/Gallery";
import AnimatedCounter from "@/components/AnimatedCounter";
import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { Truck, ShieldCheck, Clock, Headphones, Award, Leaf, Heart, Globe } from "lucide-react";
import Link from "next/link";
import SectionReveal, { RevealItem } from "@/components/SectionReveal";

function Features() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  const features = [
    { icon: Truck, title: locale === "ar" ? "توصيل سريع" : "Fast Delivery", desc: locale === "ar" ? "توصيل مجاني فوق 50$" : "Free shipping over $50" },
    { icon: ShieldCheck, title: locale === "ar" ? "جودة مضمونة" : "Quality Assured", desc: locale === "ar" ? "ضمان على كل المنتجات" : "Guarantee on all products" },
    { icon: Clock, title: locale === "ar" ? "توصيل في الوقت" : "On-Time", desc: locale === "ar" ? "التزام بالمواعيد" : "Always on schedule" },
    { icon: Headphones, title: locale === "ar" ? "دعم 24/7" : "24/7 Support", desc: locale === "ar" ? "فريق الدعم متاح دائماً" : "Team always available" },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a] border-t border-[#2a2a2a]" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <RevealItem key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-luxury rounded-2xl p-8 text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mx-auto mb-5 group-hover:border-[#c9a96e]/50 transition-all"
                  >
                    <f.icon className="w-6 h-6 text-[#c9a96e]" />
                  </motion.div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Stats() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  const stats = [
    { icon: Globe, value: 25, suffix: "+", label: locale === "ar" ? "دولة" : "Countries" },
    { icon: Award, value: 42, suffix: "+", label: locale === "ar" ? "منتج فاخر" : "Products" },
    { icon: Heart, value: 10000, suffix: "+", label: locale === "ar" ? "عميل سعيد" : "Clients" },
    { icon: Leaf, value: 100, suffix: "%", label: locale === "ar" ? "طبيعي" : "Natural" },
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#111] border-y border-[#2a2a2a]" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal stagger>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <RevealItem key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <s.icon className="w-8 h-8 text-[#c9a96e]/50 mx-auto mb-4" />
                  <div className="text-4xl md:text-5xl font-bold text-gold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-gray-500 text-sm tracking-wider">{s.label}</div>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Categories() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  const categories = [
    { icon: "🫒", title: locale === "ar" ? "زيتون" : "Olives", count: 25 },
    { icon: "🥒", title: locale === "ar" ? "مخللات" : "Pickles", count: 17 },
  ];

  return (
    <section className="py-16 md:py-28 bg-[#0a0a0a]" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal stagger>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <span className="text-[#c9a96e] text-xs font-semibold tracking-[0.3em] uppercase">
              {locale === "ar" ? "تصفح حسب التصنيف" : "Browse by Category"}
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mt-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {locale === "ar" ? "تشكيلتنا" : "Our Collection"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            {categories.map((cat, i) => (
              <RevealItem key={i}>
                <motion.a
                  href="/products"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="card-luxury card-glow rounded-2xl p-8 sm:p-12 text-center group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-6xl mb-6 transition-transform duration-300"
                  >
                    {cat.icon}
                  </motion.div>
                  <div className="text-white font-bold text-xl mb-2">{cat.title}</div>
                  <div className="text-[#c9a96e]/60 text-sm">
                    {cat.count} {locale === "ar" ? "منتج" : "products"}
                  </div>
                </motion.a>
              </RevealItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function CTA() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <section className="py-28 bg-[#0a0a0a] relative" dir={dir}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl sm:text-7xl mb-8">🫒</div>
          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {locale === "ar" ? "جرب منتجاتنا اليوم" : "Taste the Difference"}
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            {locale === "ar"
              ? "اكتشف نكهة الأصالة مع تشكيلتنا الفاخرة"
              : "Discover authenticity with our premium collection"}
          </p>
          <Link href="/products" className="btn-gold px-12 py-5 rounded-xl text-lg font-bold inline-block">
            {locale === "ar" ? "تسوق الآن" : "Shop Now"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <FeaturedProducts />
      <Categories />
      <Features />
      <Gallery />
      <Testimonials />
      <Newsletter />
      <CTA />
    </div>
  );
}
