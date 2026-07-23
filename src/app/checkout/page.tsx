"use client";

import { motion } from "framer-motion";
import { useCartStore, useLocaleStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import {
  CreditCard,
  Lock,
  Smartphone,
  Banknote,
  ArrowLeft,
  ShieldCheck,
  Package,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CheckoutPage() {
  const locale = useLocaleStore((s) => s.locale);
  const dir = useLocaleStore((s) => s.dir());
  const store = useCartStore();
  const { items } = store;
  const total = store.getTotal();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "cod">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Package className="w-20 h-20 text-[#c9a96e] mx-auto mb-6" />
          <h1
            className="text-3xl text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {locale === "ar" ? "سلة التسوق فارغة" : "Your Cart is Empty"}
          </h1>
          <p className="text-gray-400 mb-8">
            {locale === "ar"
              ? "لم تقم بإضافة أي منتجات بعد"
              : "You haven't added any items yet"}
          </p>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 bg-[#c9a96e] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#b8985d] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {locale === "ar" ? "العودة للسلة" : "Back to Cart"}
          </Link>
        </motion.div>
      </div>
    );
  }

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      locale === "ar"
        ? "تم تقديم الطلب بنجاح!"
        : "Order placed successfully!"
    );
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const subtotal = total;
  const shipping = 0;
  const totalAmount = subtotal + shipping;

  const paymentMethods = [
    {
      id: "card" as const,
      icon: CreditCard,
      label: locale === "ar" ? "بطاقة ائتمان" : "Credit Card",
    },
    {
      id: "apple" as const,
      icon: Smartphone,
      label: "Apple Pay",
    },
    {
      id: "cod" as const,
      icon: Banknote,
      label: locale === "ar" ? "الدفع عند الاستلام" : "Cash on Delivery",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[#c9a96e] hover:text-[#b8985d] transition-colors mb-6"
          >
            <ArrowLeft className={`w-5 h-5 ${dir === "rtl" ? "rotate-180" : ""}`} />
            {locale === "ar" ? "العودة للسلة" : "Back to Cart"}
          </Link>
          <h1
            className="text-4xl text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {locale === "ar" ? "إتمام الشراء" : "Checkout"}
          </h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Payment Method Tabs */}
              <motion.div
                initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-[#111111] rounded-2xl p-6 border border-[#2a2a2a]"
              >
                <h2
                  className="text-xl text-white mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {locale === "ar" ? "طريقة الدفع" : "Payment Method"}
                </h2>
                <div className="flex gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex-1 flex items-center justify-center gap-3 py-4 px-4 rounded-xl border-2 transition-all duration-300 ${
                        paymentMethod === method.id
                          ? "border-[#c9a96e] bg-[#c9a96e]/10 text-[#c9a96e]"
                          : "border-[#2a2a2a] bg-[#0a0a0a] text-gray-400 hover:border-[#444]"
                      }`}
                    >
                      <method.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{method.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Credit Card Form */}
              {paymentMethod === "card" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Card Preview */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative overflow-hidden rounded-2xl p-8 h-56"
                    style={{
                      background: "linear-gradient(135deg, #c9a96e 0%, #8b6914 50%, #c9a96e 100%)",
                    }}
                  >
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-8 bg-yellow-300/80 rounded-md" />
                        <CreditCard className="w-8 h-8 text-black/60" />
                      </div>
                      <div>
                        <p className="text-black/80 text-lg tracking-[0.2em] font-mono mb-4">
                          {cardNumber || "•••• •••• •••• ••••"}
                        </p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-black/60 text-xs uppercase mb-1">
                              {locale === "ar" ? "حامل البطاقة" : "Card Holder"}
                            </p>
                            <p className="text-black font-semibold uppercase tracking-wider">
                              {cardHolder || (locale === "ar" ? "الاسم الكامل" : "FULL NAME")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-black/60 text-xs uppercase mb-1">
                              {locale === "ar" ? "تاريخ الانتهاء" : "Expires"}
                            </p>
                            <p className="text-black font-semibold tracking-wider">
                              {expiry || "MM/YY"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card Form Fields */}
                  <div className="bg-[#111111] rounded-2xl p-6 border border-[#2a2a2a] space-y-5">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        {locale === "ar" ? "رقم البطاقة" : "Card Number"}
                      </label>
                      <div className="relative">
                        <CreditCard className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 ${dir === "rtl" ? "right-4" : "left-4"}`} />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={`w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl py-4 text-white placeholder-gray-600 focus:border-[#c9a96e] focus:outline-none transition-colors font-mono tracking-widest ${dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">
                          {locale === "ar" ? "تاريخ الانتهاء" : "Expiry Date"}
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl py-4 px-4 text-white placeholder-gray-600 focus:border-[#c9a96e] focus:outline-none transition-colors font-mono tracking-widest"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">CVV</label>
                        <div className="relative">
                          <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 ${dir === "rtl" ? "right-4" : "left-4"}`} />
                          <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder="•••"
                            maxLength={4}
                            className={`w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl py-4 text-white placeholder-gray-600 focus:border-[#c9a96e] focus:outline-none transition-colors font-mono tracking-widest ${dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"}`}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        {locale === "ar" ? "الاسم على البطاقة" : "Cardholder Name"}
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder={locale === "ar" ? "الاسم الكامل" : "John Doe"}
                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl py-4 px-4 text-white placeholder-gray-600 focus:border-[#c9a96e] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <ShieldCheck className="w-5 h-5 text-[#c9a96e]" />
                    <span>
                      {locale === "ar"
                        ? "تشفير 256-بت SSL لحماية معلوماتك"
                        : "256-bit SSL encryption to protect your information"}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Apple Pay */}
              {paymentMethod === "apple" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#111111] rounded-2xl p-10 border border-[#2a2a2a] text-center"
                >
                  <Smartphone className="w-16 h-16 text-[#c9a96e] mx-auto mb-4" />
                  <h3
                    className="text-2xl text-white mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Apple Pay
                  </h3>
                  <p className="text-gray-400 mb-8">
                    {locale === "ar"
                      ? "اضغط على الزر أدناه لإتمام الدفع باستخدام Apple Pay"
                      : "Tap the button below to complete payment with Apple Pay"}
                  </p>
                  <button
                    type="submit"
                    className="bg-white text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors"
                  >
                    {locale === "ar" ? "ادفع بـ Apple Pay" : "Pay with Apple Pay"}
                  </button>
                </motion.div>
              )}

              {/* Cash on Delivery */}
              {paymentMethod === "cod" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#111111] rounded-2xl p-10 border border-[#2a2a2a] text-center"
                >
                  <Banknote className="w-16 h-16 text-[#c9a96e] mx-auto mb-4" />
                  <h3
                    className="text-2xl text-white mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {locale === "ar" ? "الدفع عند الاستلام" : "Cash on Delivery"}
                  </h3>
                  <p className="text-gray-400">
                    {locale === "ar"
                      ? "ادفع نقداً عند استلام طلبك. يرجى تجهيز المبلغ المطلوب."
                      : "Pay cash when your order is delivered. Please have the exact amount ready."}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Right Side - Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#2a2a2a] sticky top-8">
                <h2
                  className="text-xl text-white mb-6 pb-4 border-b border-[#2a2a2a]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {locale === "ar" ? "ملخص الطلب" : "Order Summary"}
                </h2>

                {/* Items List */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#2a2a2a]">
                        <Image
                          src={item.product.image}
                          alt={locale === "ar" ? item.product.name_ar : item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">
                          {locale === "ar" ? item.product.name_ar : item.product.name}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1">
                          {locale === "ar" ? "الكمية" : "Qty"}: {item.quantity}
                        </p>
                        <p className="text-[#c9a96e] text-sm font-semibold mt-1">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Totals */}
                <div className="space-y-3 pt-4 border-t border-[#2a2a2a]">
                  <div className="flex justify-between text-gray-400">
                    <span>{locale === "ar" ? "المجموع الفرعي" : "Subtotal"}</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>{locale === "ar" ? "الشحن" : "Shipping"}</span>
                    <span className="text-[#c9a96e] font-medium">
                      {locale === "ar" ? "مجاني" : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[#2a2a2a]">
                    <span className="text-white text-lg font-semibold">
                      {locale === "ar" ? "الإجمالي" : "Total"}
                    </span>
                    <span
                      className="text-[#c9a96e] text-2xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 bg-[#c9a96e] text-black py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#b8985d] transition-colors"
                >
                  <Lock className="w-5 h-5" />
                  {locale === "ar" ? "إتمام الطلب" : "Place Order"}
                </motion.button>

                {/* Trust Badges */}
                <div className="mt-6 pt-4 border-t border-[#2a2a2a] flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Lock className="w-4 h-4" />
                    <span>{locale === "ar" ? "آمن" : "Secure"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{locale === "ar" ? "محمي" : "Protected"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Check className="w-4 h-4" />
                    <span>{locale === "ar" ? "مضمون" : "Guaranteed"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
