"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { testimonials } from "@/lib/data/products";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <section className="py-28 bg-[#0a0a0a] border-t border-[#2a2a2a]" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#c9a96e] text-xs font-semibold tracking-[0.3em] uppercase">
            {locale === "ar" ? "آراء عملائنا" : "Testimonials"}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-6 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {locale === "ar" ? "ماذا يقول عملاؤنا" : "What Clients Say"}
          </h2>
          <div className="divider-gold max-w-xs mx-auto">
            <span className="text-[#c9a96e] text-lg">✦</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-luxury rounded-2xl p-6"
            >
              <Quote className="w-8 h-8 text-[#c9a96e]/30 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#c9a96e] text-[#c9a96e]" />
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {locale === "ar" ? t.content_ar : t.content}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a2a]">
                <div className="w-10 h-10 rounded-full overflow-hidden relative border border-[#c9a96e]/20">
                  <Image
                    src={t.avatar}
                    alt={locale === "ar" ? t.name_ar : t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">
                    {locale === "ar" ? t.name_ar : t.name}
                  </div>
                  <div className="text-[#c9a96e]/60 text-xs">
                    {locale === "ar" ? t.role_ar : t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
