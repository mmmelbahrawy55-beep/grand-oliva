"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import Image from "next/image";

const images = [
  { src: "/product-images/product-14.jpg", alt: "مجموعة منتجات الراية" },
  { src: "/product-images/product-51.jpg", alt: "زيتون أصفر مشوي بالحبة السوداء" },
  { src: "/product-images/product-52.jpg", alt: "باذنجان محشي بالخضار" },
  { src: "/product-images/product-37.jpg", alt: "زيتون وردي فاخر" },
  { src: "/product-images/product-53.jpg", alt: "فلفل أحمر حار مخلل" },
  { src: "/product-images/product-31.jpg", alt: "مخللات مشكلة في طبق" },
];

export default function Gallery() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

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
            {locale === "ar" ? "معرض الصور" : "Gallery"}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-6 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {locale === "ar" ? "من مزارعنا إلى مطبخك" : "From Farm to Kitchen"}
          </h2>
          <div className="divider-gold max-w-xs mx-auto">
            <span className="text-[#c9a96e] text-lg">✦</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl border border-[#2a2a2a] hover:border-[#c9a96e]/30 transition-all duration-500"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
