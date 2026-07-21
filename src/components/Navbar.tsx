"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore, useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale } = useLocaleStore();
  const itemCount = useCartStore((s) => s.getItemCount());
  const dir = useLocaleStore((s) => s.dir());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl font-serif">G</span>
            </div>
            <div className="hidden sm:block">
              <span
                className={`text-xl font-bold font-serif tracking-tight ${
                  scrolled ? "text-emerald-800" : "text-white"
                }`}
              >
                Grand Oliva
              </span>
              <span
                className={`block text-xs ${
                  scrolled ? "text-emerald-600" : "text-emerald-200"
                }`}
              >
                {locale === "ar" ? "زيتون ومخللات" : "Olives & Pickles"}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {(["home", "products", "about", "contact"] as const).map((item) => (
              <Link
                key={item}
                href={item === "home" ? "/" : `/${item}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {t(locale, `nav.${item}`)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Globe className="w-5 h-5" />
            </button>

            <Link
              href="/cart"
              className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "text-gray-700 hover:bg-emerald-50"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {(["home", "products", "about", "contact"] as const).map((item) => (
                <Link
                  key={item}
                  href={item === "home" ? "/" : `/${item}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                >
                  {t(locale, `nav.${item}`)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
