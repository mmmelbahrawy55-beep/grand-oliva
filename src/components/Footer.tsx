"use client";

import Link from "next/link";
import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());

  return (
    <footer className="bg-emerald-900 text-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl font-serif">G</span>
              </div>
              <div>
                <span className="text-xl font-bold font-serif">Grand Oliva</span>
                <span className="block text-emerald-300 text-xs">
                  {locale === "ar" ? "زيتون ومخللات" : "Olives & Pickles"}
                </span>
              </div>
            </div>
            <p className="text-emerald-200 text-sm leading-relaxed">
              {locale === "ar"
                ? "أجود أنواع الزيتون والمخللات الطبيعية المصنوعة يدوياً بأجود المكونات"
                : "Finest natural olives and pickles handcrafted with the best ingredients"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">
              {locale === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {(["home", "products", "about", "contact"] as const).map((item) => (
                <li key={item}>
                  <Link
                    href={item === "home" ? "/" : `/${item}`}
                    className="text-emerald-200 hover:text-white transition-colors text-sm"
                  >
                    {t(locale, `nav.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">
              {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-emerald-200 text-sm">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                {locale === "ar"
                  ? "القاهرة، مصر"
                  : "Cairo, Egypt"}
              </li>
              <li className="flex items-center gap-3 text-emerald-200 text-sm">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                +20 123 456 7890
              </li>
              <li className="flex items-center gap-3 text-emerald-200 text-sm">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                info@grandoliva.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">
              {locale === "ar" ? "تابعنا" : "Follow Us"}
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-colors"
              >
                <span className="font-bold text-sm">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-colors"
              >
                <span className="font-bold text-sm">ig</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-colors"
              >
                <span className="font-bold text-sm">tw</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-800 mt-12 pt-8 text-center">
          <p className="text-emerald-300 text-sm">
            &copy; {new Date().getFullYear()} Grand Oliva. {t(locale, "footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
