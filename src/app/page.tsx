"use client";

import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Gallery from "@/components/Gallery";
import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { Truck, ShieldCheck, Clock, Headphones, Award, Leaf, Heart, Globe } from "lucide-react";
import Link from "next/link";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-luxury rounded-2xl p-8 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mx-auto mb-5">
                <f.icon className="w-6 h-6 text-[#c9a96e]" />
              </div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  const stats = [
    { icon: Globe, value: "25+", label: locale === "ar" ? "دولة" : "Countries" },
    { icon: Award, value: "50+", label: locale === "ar" ? "منتج فاخر" : "Products" },
    { icon: Heart, value: "10K+", label: locale === "ar" ? "عميل سعيد" : "Clients" },
    { icon: Leaf, value: "100%", label: locale === "ar" ? "طبيعي" : "Natural" },
  ];

  return (
    <section className="py-20 bg-[#111] border-y border-[#2a2a2a]" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <s.icon className="w-8 h-8 text-[#c9a96e]/50 mx-auto mb-4" />
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {s.value}
              </div>
              <div className="text-gray-500 text-sm tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  const categories = [
    { icon: "🫒", title: locale === "ar" ? "زيتون" : "Olives", count: 15 },
    { icon: "🥒", title: locale === "ar" ? "مخللات" : "Pickles", count: 12 },
    { icon: "🫙", title: locale === "ar" ? "صلصات" : "Sauces", count: 8 },
    { icon: "🎁", title: locale === "ar" ? "هدايا" : "Gifts", count: 5 },
  ];

  return (
    <section className="py-28 bg-[#0a0a0a]" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.a
              key={i}
              href="/products"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="card-luxury rounded-2xl p-8 text-center group cursor-pointer"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
              <div className="text-white font-bold text-lg mb-1">{cat.title}</div>
              <div className="text-[#c9a96e]/60 text-sm">
                {cat.count} {locale === "ar" ? "منتج" : "products"}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <section className="py-28 bg-[#0a0a0a] relative overflow-hidden" dir={dir}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9a96e] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#c9a96e] rounded-full blur-[120px]" />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl mb-6">🫒</div>
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
    <>
      <Hero />
      <Stats />
      <FeaturedProducts />
      <Categories />
      <Features />
      <Gallery />
      <Testimonials />
      <Newsletter />
      <CTA />
    </>
  );
}
