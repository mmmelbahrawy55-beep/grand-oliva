"use client";

import { useLocaleStore, useCartStore } from "@/lib/store";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { locale } = useLocaleStore();
  const dir = useLocaleStore((s) => s.dir());
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.getTotal());
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <>
      {/* Backdrop — CSS transition */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer — CSS transform slide, GPU accelerated */}
      <div
        className={`fixed top-0 h-full w-full max-w-md bg-[#111] border-l border-[#2a2a2a] z-[70] flex flex-col will-change-transform ${
          dir === "rtl" ? "left-0" : "right-0"
        } ${isOpen ? "cart-slide-in" : "cart-slide-out"}`}
        dir={dir}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#c9a96e]" />
            <h2 className="text-lg font-bold text-white">
              {locale === "ar" ? "سلة المشتريات" : "Cart"}
            </h2>
            <span className="text-xs text-[#c9a96e] bg-[#c9a96e]/10 px-2 py-1 rounded-lg">
              {itemCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-white hover:border-[#c9a96e]/30 transition-all active:scale-95"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-touch">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-700 mb-4" />
              <p className="text-gray-500 mb-4">
                {locale === "ar" ? "سلتك فارغة" : "Your cart is empty"}
              </p>
              <button
                onClick={onClose}
                className="btn-gold px-6 py-3 rounded-xl text-sm font-bold active:scale-95 transition-transform"
              >
                {locale === "ar" ? "ابدأ التسوق" : "Start Shopping"}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a]"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden relative bg-[#222] shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {locale === "ar" ? item.product.name_ar : item.product.name}
                  </h3>
                  <p className="text-[#c9a96e] font-bold text-sm mt-1">
                    ${(item.product.price ?? 0).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-9 h-9 rounded-lg bg-[#222] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c9a96e]/30 transition-all active:scale-90"
                      aria-label={`Decrease quantity of ${item.product.name}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-white text-sm font-bold w-8 text-center" aria-label={`Quantity: ${item.quantity}`}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-9 h-9 rounded-lg bg-[#222] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c9a96e]/30 transition-all active:scale-90"
                      aria-label={`Increase quantity of ${item.product.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-colors active:scale-90"
                  aria-label={`Remove ${item.product.name} from cart`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#2a2a2a] space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{locale === "ar" ? "المجموع" : "Subtotal"}</span>
              <span className="text-white font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{locale === "ar" ? "الشحن" : "Shipping"}</span>
              <span className="text-[#c9a96e]">{locale === "ar" ? "مجاني" : "Free"}</span>
            </div>
            <div className="gold-line" />
            <div className="flex justify-between">
              <span className="text-white font-bold">{locale === "ar" ? "الإجمالي" : "Total"}</span>
              <span className="text-[#c9a96e] font-bold text-xl">${total.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="btn-gold w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              {locale === "ar" ? "إتمام الشراء" : "Checkout"}
              <ArrowRight className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
            </Link>
            <button
              onClick={clearCart}
              className="w-full py-3.5 rounded-xl border border-[#2a2a2a] text-gray-500 text-sm hover:text-red-500 hover:border-red-500/30 transition-all active:scale-[0.98]"
            >
              {locale === "ar" ? "تفريغ السلة" : "Clear Cart"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
