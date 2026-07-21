"use client";

import Link from "next/link";
import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a]" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border border-[#c9a96e]/40 rounded-xl flex items-center justify-center">
                <span className="text-[#c9a96e] font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>G</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
                  GRAND OLIVA
                </span>
                <span className="block text-[9px] text-[#c9a96e]/50 tracking-[0.3em] uppercase">
                  Est. 1950
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {locale === "ar"
                ? "أجود أنواع الزيتون والمخللات الطبيعية المصنوعة يدوياً بأجود المكونات."
                : "The finest natural olives and pickles, handcrafted with the best ingredients."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#c9a96e] text-xs font-semibold tracking-[0.3em] uppercase mb-8">
              {locale === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-4">
              {(["home", "products", "about", "contact"] as const).map((item) => (
                <li key={item}>
                  <Link
                    href={item === "home" ? "/" : `/${item}`}
                    className="text-gray-500 hover:text-[#c9a96e] transition-colors text-sm"
                  >
                    {t(locale, `nav.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#c9a96e] text-xs font-semibold tracking-[0.3em] uppercase mb-8">
              {locale === "ar" ? "تواصل معنا" : "Contact"}
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>{locale === "ar" ? "القاهرة، مصر" : "Cairo, Egypt"}</li>
              <li>+20 123 456 7890</li>
              <li>info@grandoliva.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#c9a96e] text-xs font-semibold tracking-[0.3em] uppercase mb-8">
              {locale === "ar" ? "النشرة البريدية" : "Newsletter"}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {locale === "ar" ? "اشترك للحصول على العروض الحصرية" : "Subscribe for exclusive offers"}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={locale === "ar" ? "بريدك الإلكتروني" : "Your email"}
                className="flex-1 bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-[#c9a96e]/50 outline-none transition-colors"
              />
              <button className="btn-gold px-6 py-3 rounded-lg text-xs font-bold tracking-wider uppercase">
                {locale === "ar" ? "اشترك" : "Join"}
              </button>
            </div>
          </div>
        </div>

        <div className="gold-line mt-16 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Grand Oliva. {t(locale, "footer.rights")}
          </p>
          <div className="flex gap-6">
            {["Facebook", "Instagram", "Twitter"].map((s) => (
              <a key={s} href="#" className="text-gray-600 hover:text-[#c9a96e] text-xs transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
