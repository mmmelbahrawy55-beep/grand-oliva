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
    <section className="py-24 bg-[#0a0a0a] border-t border-[#2a2a2a]" dir={dir}>
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 rounded-2xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mx-auto mb-8">
            <Send className="w-7 h-7 text-[#c9a96e]" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {locale === "ar" ? "اشترك في نشرتنا" : "Subscribe to Newsletter"}
          </h2>
          <p className="text-gray-500 mb-10">
            {locale === "ar"
              ? "احصل على أحدث العروض مباشرة في بريدك"
              : "Get the latest offers directly in your inbox"}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={locale === "ar" ? "بريدك الإلكتروني" : "Your email"}
              className="flex-1 bg-[#111] border border-[#2a2a2a] rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:border-[#c9a96e]/50 outline-none transition-colors"
            />
            <button type="submit" className="btn-gold px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              {submitted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  {locale === "ar" ? "تم!" : "Done!"}
                </>
              ) : (
                locale === "ar" ? "اشترك" : "Subscribe"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
