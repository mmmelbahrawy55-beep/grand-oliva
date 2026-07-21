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
    <section className="py-28 bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 relative overflow-hidden" dir={dir}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
            {locale === "ar" ? "آراء عملائنا" : "Testimonials"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 font-serif">
            {locale === "ar" ? "ماذا يقول عملاؤنا؟" : "What Our Clients Say"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-emerald-400/50 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                {locale === "ar" ? testimonial.content_ar : testimonial.content}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image
                    src={testimonial.avatar}
                    alt={locale === "ar" ? testimonial.name_ar : testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">
                    {locale === "ar" ? testimonial.name_ar : testimonial.name}
                  </div>
                  <div className="text-emerald-300/70 text-xs">
                    {locale === "ar" ? testimonial.role_ar : testimonial.role}
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
