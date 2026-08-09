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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
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
            <ul className="space-y-1">
              {(["home", "products", "about", "contact"] as const).map((item) => (
                <li key={item}>
                  <Link
                    href={item === "home" ? "/" : `/${item}`}
                    className="text-gray-500 hover:text-[#c9a96e] transition-colors text-sm block py-2.5 px-2 -mx-2 rounded-lg hover:bg-[#c9a96e]/[0.05]"
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
              <li><a href="tel:+201288367098" className="hover:text-[#c9a96e] transition-colors">+20 128 836 7098</a></li>
              <li><a href="mailto:grand_olivee@yahoo.com" className="hover:text-[#c9a96e] transition-colors">grand_olivee@yahoo.com</a></li>
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
          <div className="flex gap-2">
            <a href="https://facebook.com/grandoliva" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c9a96e] text-xs transition-colors py-2.5 px-3 rounded-lg hover:bg-[#c9a96e]/[0.05]">Facebook</a>
            <a href="https://instagram.com/grandoliva" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c9a96e] text-xs transition-colors py-2.5 px-3 rounded-lg hover:bg-[#c9a96e]/[0.05]">Instagram</a>
            <a href="https://twitter.com/grandoliva" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c9a96e] text-xs transition-colors py-2.5 px-3 rounded-lg hover:bg-[#c9a96e]/[0.05]">Twitter</a>
            <a href="https://youtube.com/grandoliva" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c9a96e] text-xs transition-colors py-2.5 px-3 rounded-lg hover:bg-[#c9a96e]/[0.05]">YouTube</a>
          </div>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-[#1a1a1a]">
          <div dir="ltr" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#111] border border-[#2a2a2a]">
            <div className="w-2 h-2 rounded-full bg-[#c9a96e] animate-pulse" />
            <p className="text-gray-400 text-[11px] tracking-[0.15em] uppercase">
              Designed by
            </p>
            <span className="text-[#c9a96e] text-sm font-bold tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
              elba7rawy
            </span>
            <p className="text-gray-400 text-[11px] tracking-[0.15em] uppercase">
              advertising
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
