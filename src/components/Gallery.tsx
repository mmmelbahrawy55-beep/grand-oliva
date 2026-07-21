"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import Image from "next/image";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=400&fit=crop", alt: "Olive grove" },
  { src: "https://images.unsplash.com/photo-1609177026932-2ff0e9e9bd6a?w=600&h=400&fit=crop", alt: "Green olives" },
  { src: "https://images.unsplash.com/photo-1571290274554-6a2eaa74d75b?w=600&h=400&fit=crop", alt: "Olive oil" },
  { src: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&h=400&fit=crop", alt: "Pickles" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop", alt: "Mediterranean food" },
  { src: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=400&fit=crop", alt: "Olives platter" },
];

export default function Gallery() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <section className="py-24 bg-gray-50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">
            {locale === "ar" ? "معرض الصور" : "Gallery"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 font-serif">
            {locale === "ar" ? "من مزارعنا إلى مطبخك" : "From Our Farms to Your Kitchen"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              className={`relative overflow-hidden rounded-2xl ${
                i === 0 || i === 5 ? "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-square"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
