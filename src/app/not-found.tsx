"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center" dir={dir}>
      <div className="text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <Search className="w-16 h-16 text-[#c9a96e]/30 mx-auto mb-8" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-9xl font-bold text-gold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          404
        </motion.h1>
        <div className="gold-line max-w-xs mx-auto mb-8" />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-2xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          {locale === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-gray-500 mb-10 max-w-md mx-auto">
          {locale === "ar" ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها." : "Sorry, the page you are looking for does not exist or has been moved."}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Link href="/" className="btn-gold px-8 py-4 rounded-xl font-bold inline-flex items-center gap-3">
            <Home className="w-5 h-5" />
            {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
