"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-24 bg-white" dir={dir}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-emerald-50 to-lime-50 rounded-[2rem] p-12 md:p-16 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-lime-200/30 rounded-full blur-3xl" />

          <div className="relative text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Send className="w-8 h-8 text-emerald-600" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
              {locale === "ar" ? "اشترك في نشرتنا البريدية" : "Subscribe to Our Newsletter"}
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              {locale === "ar"
                ? "احصل على أحدث العروض والخصومات مباشرة في بريدك الإلكتروني"
                : "Get the latest offers and discounts directly in your inbox"}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={locale === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-white"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {locale === "ar" ? "تم!" : "Done!"}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {locale === "ar" ? "اشترك" : "Subscribe"}
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
