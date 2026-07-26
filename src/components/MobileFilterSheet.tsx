"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { useState } from "react";

interface FilterCategory {
  label: string;
  value: string;
  icon: string;
}

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  currentSort: string;
  onSortChange: (sort: string) => void;
  locale: string;
  categories: FilterCategory[];
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
}

const sortOptions = [
  { value: "featured", labelEn: "Featured", labelAr: "المميزة" },
  { value: "price-low", labelEn: "Price: Low to High", labelAr: "السعر: من الأقل" },
  { value: "price-high", labelEn: "Price: High to Low", labelAr: "السعر: من الأعلى" },
  { value: "rating", labelEn: "Top Rated", labelAr: "الأعلى تقييماً" },
  { value: "name", labelEn: "Name", labelAr: "الاسم" },
];

export default function MobileFilterSheet({
  isOpen,
  onClose,
  currentCategory,
  onCategoryChange,
  currentSort,
  onSortChange,
  locale,
  categories,
  priceRange = [0, 500],
  onPriceRangeChange,
}: MobileFilterSheetProps) {
  const [localPrice, setLocalPrice] = useState<number>(priceRange[1]);
  const [sortExpanded, setSortExpanded] = useState(false);

  const dir = locale === "ar" ? "rtl" : "ltr";

  const handleBackdropTap = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="filter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropTap}
            className="fixed inset-0 bg-black/70 z-[80]"
          />

          <motion.div
            key="filter-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
            className="fixed bottom-0 left-0 right-0 bg-[#111] rounded-t-3xl border-t border-[#c9a96e]/20 z-[90] max-h-[85vh] overflow-y-auto overscroll-contain"
            dir={dir}
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)", WebkitOverflowScrolling: "touch" }}
          >
            <div
              className="w-10 h-1 rounded-full bg-[#333] mx-auto mt-3 cursor-grab active:cursor-grabbing"
            />

            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#c9a96e]" />
                  <h2
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {locale === "ar" ? "التصفية" : "Filters"}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-white hover:border-[#c9a96e]/30 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-7">
                <span className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-3 block">
                  {locale === "ar" ? "الفئة" : "Category"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => onCategoryChange(cat.value)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border ${
                        currentCategory === cat.value
                          ? "bg-[#c9a96e] text-[#0a0a0a] border-[#c9a96e] shadow-lg shadow-[#c9a96e]/20"
                          : "bg-[#1a1a1a] text-gray-400 border-[#2a2a2a] hover:border-[#c9a96e]/30 hover:text-[#c9a96e]"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <button
                  onClick={() => setSortExpanded(!sortExpanded)}
                  className="w-full flex items-center justify-between text-left mb-3"
                >
                  <span className="text-[10px] text-gray-600 tracking-[0.2em] uppercase">
                    {locale === "ar" ? "ترتيب حسب" : "Sort By"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      sortExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {sortExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1">
                        {sortOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              onSortChange(opt.value);
                              setSortExpanded(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                              currentSort === opt.value
                                ? "bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/30"
                                : "text-gray-400 hover:bg-[#1a1a1a] border border-transparent"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                currentSort === opt.value
                                  ? "border-[#c9a96e]"
                                  : "border-[#333]"
                              }`}
                            >
                              {currentSort === opt.value && (
                                <span className="w-2 h-2 rounded-full bg-[#c9a96e]" />
                              )}
                            </span>
                            <span>{locale === "ar" ? opt.labelAr : opt.labelEn}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!sortExpanded && (
                  <div className="px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-sm text-gray-400">
                    {locale === "ar"
                      ? sortOptions.find((o) => o.value === currentSort)?.labelAr
                      : sortOptions.find((o) => o.value === currentSort)?.labelEn}
                  </div>
                )}
              </div>

              <div className="mb-8">
                <span className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-4 block">
                  {locale === "ar" ? "نطاق السعر" : "Price Range"}
                </span>
                <div className="px-1">
                  <input
                    type="range"
                    min={0}
                    max={500}
                    value={localPrice}
                    onChange={(e) => setLocalPrice(Number(e.target.value))}
                    className="w-full accent-[#c9a96e] h-1 bg-[#2a2a2a] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#c9a96e] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#c9a96e]/30"
                  />
                  <div className="flex justify-between mt-3 text-sm text-gray-500">
                    <span>$0</span>
                    <span className="text-[#c9a96e] font-medium">${localPrice}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-br from-[#c9a96e] to-[#b8985d] text-[#0a0a0a] shadow-lg shadow-[#c9a96e]/20 active:scale-[0.98] transition-transform"
              >
                {locale === "ar" ? "تطبيق الفلاتر" : "Apply Filters"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
