"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Target, Eye, Heart, Leaf } from "lucide-react";

export default function AboutPage() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <section className="pt-28 pb-20 bg-[#0a0a0a] min-h-screen" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t(locale, "about.title")}
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            {t(locale, "about.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Target, title: "about.mission", text: "about.mission_text" },
            { icon: Eye, title: "about.vision", text: "about.vision_text" },
            { icon: Heart, title: "about.values", text: "about.values_text" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111111] rounded-3xl p-8 border border-[#2a2a2a] hover:border-[#c9a96e]/20 transition-all text-center"
            >
              <div className="w-16 h-16 bg-[#c9a96e]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-8 h-8 text-[#c9a96e]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t(locale, item.title)}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {t(locale, item.text)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#c9a96e]/20 to-[#c9a96e]/5 rounded-3xl p-12 text-center border border-[#c9a96e]/20"
        >
          <Leaf className="w-16 h-16 text-[#c9a96e] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {locale === "ar" ? "لماذا تختارنا؟" : "Why Choose Us?"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {locale === "ar"
              ? "نقدم لكم أجود منتجات الزيتون والمخللات الطبيعية بجودة عالمية وأسعار منافسة"
              : "We deliver the finest natural olives and pickles with world-class quality and competitive prices"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
