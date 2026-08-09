"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore, useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { locale, setLocale } = useLocaleStore();
  const itemCount = useCartStore((s) => s.getItemCount());
  const dir = useLocaleStore((s) => s.dir());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      window.history.pushState({ navMenu: true }, "");
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleBack = (e: PopStateEvent) => {
      if (isCartOpen) {
        setIsCartOpen(false);
        e.preventDefault();
        window.history.pushState({ cartOpen: true }, "");
      } else if (isOpen) {
        setIsOpen(false);
        e.preventDefault();
      }
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [isOpen, isCartOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 will-change-transform ${
          scrolled
            ? "bg-[#0a0a0a]/95 border-b border-[#1a1a1a] nav-scrolled"
            : "bg-transparent"
        }`}
        dir={dir}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[env(safe-area-inset-top)]">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            <Link href="/" className="flex items-center gap-2 sm:gap-4 group">
              <div className="w-12 h-12 border border-[#c9a96e]/40 rounded-xl flex items-center justify-center group-hover:border-[#c9a96e] transition-colors duration-500">
                <span className="text-[#c9a96e] font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>G</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold tracking-wider text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  GRAND OLIVA
                </span>
                <span className="block text-[10px] text-[#c9a96e]/60 tracking-[0.3em] uppercase">
                  {locale === "ar" ? "زيتون ومخللات" : "Olives & Pickles"}
                </span>
              </div>
            </Link>

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

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
                className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-[#c9a96e] transition-colors duration-300 border border-transparent hover:border-[#c9a96e]/20 rounded-xl active:scale-95"
                aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
              >
                <Globe className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-11 h-11 flex items-center justify-center text-gray-500 hover:text-[#c9a96e] transition-colors duration-300 border border-transparent hover:border-[#c9a96e]/20 rounded-xl active:scale-95"
                aria-label={`${locale === "ar" ? "سلة المشتريات" : "Shopping cart"} — ${itemCount} ${locale === "ar" ? "عناصر" : "items"}`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c9a96e] text-[#0a0a0a] text-[10px] rounded-full flex items-center justify-center font-bold nav-badge-pop">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center text-gray-500 hover:text-[#c9a96e] transition-colors active:scale-95"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu — CSS transitions, no framer-motion */}
        <div className={`lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpen(false)} />
        <div className={`lg:hidden bg-[#0a0a0a] border-t border-[#2a2a2a] overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-[50vh] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 py-6 space-y-1">
            {(["home", "products", "about", "contact"] as const).map((item, i) => (
              <Link
                key={item}
                href={item === "home" ? "/" : `/${item}`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3.5 text-gray-400 hover:text-[#c9a96e] hover:bg-[#c9a96e]/[0.05] font-medium tracking-wider uppercase text-base transition-colors rounded-xl active:scale-[0.98]"
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
              >
                {t(locale, `nav.${item}`)}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
