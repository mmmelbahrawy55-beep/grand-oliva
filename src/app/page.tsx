"use client";

import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { Truck, ShieldCheck, Clock, Headphones } from "lucide-react";

function Features() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  const features = [
    { icon: Truck, title: locale === "ar" ? "توصيل سريع" : "Fast Delivery", desc: locale === "ar" ? "توصيل مجاني للطلبات فوق 50$" : "Free shipping on orders over $50" },
    { icon: ShieldCheck, title: locale === "ar" ? "جودة مضمونة" : "Quality Guaranteed", desc: locale === "ar" ? "ضمان الجودة على جميع المنتجات" : "Quality guarantee on all products" },
    { icon: Clock, title: locale === "ar" ? "توصيل في الوقت" : "On-Time Delivery", desc: locale === "ar" ? "نلتزم بالمواعيد المحددة" : "We stick to scheduled deliveries" },
    { icon: Headphones, title: locale === "ar" ? "دعم متواصل" : "24/7 Support", desc: locale === "ar" ? "فريق الدعم متاح على مدار الساعة" : "Support team available around the clock" },
  ];

  return (
    <section className="py-20 bg-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </motion.div>
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
    <section className="py-24 bg-gradient-to-br from-emerald-700 to-green-700" dir={dir}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            {locale === "ar" ? "جرب منتجاتنا اليوم" : "Try Our Products Today"}
          </h2>
          <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto">
            {locale === "ar"
              ? "اكتشف نكهة الأصالة مع تشكيلتنا المميزة من الزيتون والمخللات الطبيعية"
              : "Discover the taste of authenticity with our premium collection of natural olives and pickles"}
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-3 bg-white text-emerald-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl"
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
      <FeaturedProducts />
      <Features />
      <CTA />
    </>
  );
}
