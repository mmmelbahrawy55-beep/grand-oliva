"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(locale === "ar" ? "تم إرسال رسالتك بنجاح" : "Message sent successfully");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="pt-28 pb-20 bg-[#0a0a0a] min-h-screen" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t(locale, "nav.contact")}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {locale === "ar"
              ? "نسعد بتواصلكم معنا ونحن هنا لمساعدتكم"
              : "We look forward to hearing from you and we are here to help"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-[#111111] rounded-3xl p-8 border border-[#2a2a2a]">
              <h2 className="text-2xl font-bold text-white mb-6">
                {locale === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    {locale === "ar" ? "الاسم" : "Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]/20 outline-none transition-all"
                    placeholder={locale === "ar" ? "أدخل اسمك" : "Enter your name"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    {locale === "ar" ? "البريد الإلكتروني" : "Email"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]/20 outline-none transition-all"
                    placeholder={locale === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    {locale === "ar" ? "الموضوع" : "Subject"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]/20 outline-none transition-all"
                    placeholder={locale === "ar" ? "موضوع الرسالة" : "Message subject"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    {locale === "ar" ? "الرسالة" : "Message"}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]/20 outline-none transition-all resize-none"
                    placeholder={locale === "ar" ? "اكتب رسالتك هنا..." : "Write your message here..."}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-gold py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {locale === "ar" ? "إرسال" : "Send"}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, title: t(locale, "footer.address"), value: locale === "ar" ? "القاهرة، مصر" : "Cairo, Egypt" },
              { icon: Phone, title: t(locale, "footer.phone"), value: "+20 123 456 7890" },
              { icon: Mail, title: t(locale, "footer.email"), value: "info@grandoliva.com" },
              { icon: Clock, title: locale === "ar" ? "ساعات العمل" : "Working Hours", value: locale === "ar" ? "السبت - الخميس: 9 صباحاً - 6 مساءً" : "Sat - Thu: 9 AM - 6 PM" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-[#111111] rounded-2xl p-6 border border-[#2a2a2a] flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-[#c9a96e]/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-[#c9a96e]" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-gray-500">{item.value}</p>
                </div>
              </motion.div>
            ))}

            <div className="bg-gradient-to-br from-[#c9a96e]/20 to-[#c9a96e]/5 rounded-3xl p-8 border border-[#c9a96e]/20">
              <h3 className="text-xl font-bold text-white mb-4">
                {locale === "ar" ? "تابعنا على وسائل التواصل" : "Follow us on social media"}
              </h3>
              <p className="text-gray-400 mb-6">
                {locale === "ar"
                  ? "ابق على اطلاع بآخر أخبارنا وعروضنا"
                  : "Stay updated with our latest news and offers"}
              </p>
              <div className="flex gap-4">
                {["Facebook", "Instagram", "Twitter", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 bg-[#c9a96e]/10 border border-[#c9a96e]/20 rounded-xl flex items-center justify-center hover:bg-[#c9a96e]/20 transition-colors text-[#c9a96e] text-sm font-bold"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
