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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-white/80 backdrop-blur-2xl shadow-xl shadow-black/5 border-b border-gray-100"
          : "bg-transparent"
      }`}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow"
            >
              <span className="text-white font-bold text-xl font-serif">G</span>
            </motion.div>
            <div className="hidden sm:block">
              <span
                className={`text-xl font-bold font-serif tracking-tight transition-colors ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Grand Oliva
              </span>
              <span
                className={`block text-xs transition-colors ${
                  scrolled ? "text-emerald-600" : "text-emerald-200"
                }`}
              >
                {locale === "ar" ? "زيتون ومخللات فاخرة" : "Premium Olives & Pickles"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {(["home", "products", "about", "contact"] as const).map((item) => (
              <Link
                key={item}
                href={item === "home" ? "/" : `/${item}`}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  scrolled
                    ? "text-gray-700 hover:text-emerald-700"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {t(locale, `nav.${item}`)}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-500 rounded-full group-hover:w-6 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
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
                  className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg shadow-rose-500/30"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-2">
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
