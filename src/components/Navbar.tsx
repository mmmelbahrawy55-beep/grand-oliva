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
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#2a2a2a]"
          : "bg-transparent"
      }`}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 border border-[#c9a96e]/40 rounded-xl flex items-center justify-center group-hover:border-[#c9a96e] transition-colors duration-500">
              <span className="text-[#c9a96e] font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>G</span>
            </div>
            <div className="hidden sm:block">
              <span
                className="text-lg font-bold tracking-wider text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                GRAND OLIVA
              </span>
              <span className="block text-[10px] text-[#c9a96e]/60 tracking-[0.3em] uppercase">
                {locale === "ar" ? "زيتون ومخللات" : "Olives & Pickles"}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {(["home", "products", "about", "contact"] as const).map((item) => (
              <Link
                key={item}
                href={item === "home" ? "/" : `/${item}`}
                className="relative px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-[#c9a96e] transition-colors duration-300 tracking-wider uppercase"
              >
                {t(locale, `nav.${item}`)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="p-3 text-gray-500 hover:text-[#c9a96e] transition-colors duration-300 border border-transparent hover:border-[#c9a96e]/20 rounded-xl"
            >
              <Globe className="w-5 h-5" />
            </button>

            <Link
              href="/cart"
              className="relative p-3 text-gray-500 hover:text-[#c9a96e] transition-colors duration-300 border border-transparent hover:border-[#c9a96e]/20 rounded-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#c9a96e] text-[#0a0a0a] text-[10px] rounded-full flex items-center justify-center font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 text-gray-500 hover:text-[#c9a96e] transition-colors"
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
            className="lg:hidden bg-[#0a0a0a] border-t border-[#2a2a2a]"
          >
            <div className="px-4 py-6 space-y-1">
              {(["home", "products", "about", "contact"] as const).map((item) => (
                <Link
                  key={item}
                  href={item === "home" ? "/" : `/${item}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-400 hover:text-[#c9a96e] font-medium tracking-wider uppercase text-sm transition-colors"
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
