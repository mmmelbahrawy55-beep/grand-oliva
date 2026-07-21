"use client";

import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Gallery from "@/components/Gallery";
import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { Truck, ShieldCheck, Clock, Headphones, Award, Leaf, Heart, Globe } from "lucide-react";

function Features() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  const features = [
    { icon: Truck, title: locale === "ar" ? "توصيل سريع" : "Fast Delivery", desc: locale === "ar" ? "توصيل مجاني للطلبات فوق 50$" : "Free shipping on orders over $50", color: "blue" },
    { icon: ShieldCheck, title: locale === "ar" ? "جودة مضمونة" : "Quality Guaranteed", desc: locale === "ar" ? "ضمان الجودة على جميع المنتجات" : "Quality guarantee on all products", color: "emerald" },
    { icon: Clock, title: locale === "ar" ? "توصيل في الوقت" : "On-Time Delivery", desc: locale === "ar" ? "نلتزم بالمواعيد المحددة" : "We stick to scheduled deliveries", color: "purple" },
    { icon: Headphones, title: locale === "ar" ? "دعم متواصل" : "24/7 Support", desc: locale === "ar" ? "فريق الدعم متاح على مدار الساعة" : "Support team available around the clock", color: "orange" },
  ];

  return (
    <section className="py-20 bg-white relative" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-8 rounded-3xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
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
    { icon: Globe, value: "25+", label: locale === "ar" ? "دولة حول العالم" : "Countries Worldwide" },
    { icon: Award, value: "50+", label: locale === "ar" ? "نوع منتج فاخر" : "Premium Products" },
    { icon: Heart, value: "10K+", label: locale === "ar" ? "عميل سعيد" : "Happy Customers" },
    { icon: Leaf, value: "100%", label: locale === "ar" ? "مكونات طبيعية" : "Natural Ingredients" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-green-700 relative overflow-hidden" dir={dir}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-emerald-100 text-sm">{stat.label}</div>
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
    { icon: "🫒", title: locale === "ar" ? "زيتون" : "Olives", count: 15, color: "from-emerald-500 to-green-600" },
    { icon: "🥒", title: locale === "ar" ? "مخللات" : "Pickles", count: 12, color: "from-lime-500 to-green-500" },
    { icon: "🫙", title: locale === "ar" ? "صلصات" : "Sauces", count: 8, color: "from-orange-500 to-red-500" },
    { icon: "🎁", title: locale === "ar" ? "هدايا فاخرة" : "Gift Boxes", count: 5, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <section className="py-24 bg-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">
            {locale === "ar" ? "تصفح حسب التصنيف" : "Browse by Category"}
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
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-gradient-to-br ${cat.color} rounded-3xl p-8 text-white text-center overflow-hidden group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="text-5xl mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
              <div className="text-xl font-bold mb-1 relative z-10">{cat.title}</div>
              <div className="text-white/70 text-sm relative z-10">{cat.count} {locale === "ar" ? "منتج" : "products"}</div>
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
    <section className="py-24 bg-gradient-to-br from-emerald-700 via-green-700 to-teal-700 relative overflow-hidden" dir={dir}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lime-400 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl mb-6">🫒</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            {locale === "ar" ? "جرب منتجاتنا اليوم" : "Try Our Products Today"}
          </h2>
          <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            {locale === "ar"
              ? "اكتشف نكهة الأصالة مع تشكيلتنا المميزة من الزيتون والمخللات الطبيعية"
              : "Discover the taste of authenticity with our premium collection of natural olives and pickles"}
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-3 bg-white text-emerald-700 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
          >
            {locale === "ar" ? "تسوق الآن" : "Shop Now"}
          </a>
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
