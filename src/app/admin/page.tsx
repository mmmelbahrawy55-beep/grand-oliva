"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminStore } from "@/lib/admin-store";
import { useProducts } from "@/lib/admin-helpers";
import type { Product } from "@/lib/types";
import Image from "next/image";
import {
  Search, X, Save, LogOut, Package,
  Edit3, ChevronDown, Check, Star, Plus,
  DollarSign, Tag, Globe, Weight, Image as ImageIcon
} from "lucide-react";

function LoginForm({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-[#c9a96e]" />
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Grand Oliva Admin
          </h1>
          <p className="text-gray-500 text-sm mt-2">Dashboard Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className={`w-full bg-[#111] border ${error ? "border-red-500" : "border-[#2a2a2a]"} text-white placeholder-gray-600 rounded-xl px-5 py-4 focus:border-[#c9a96e]/50 outline-none transition-all`}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs mt-2">Invalid password</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full btn-gold py-4 rounded-xl font-bold text-base"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  type = "text",
  placeholder,
  dir,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-gray-400 text-xs font-medium tracking-wider uppercase mb-2 block">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
            {icon}
          </div>
        )}
        {textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            dir={dir}
            rows={4}
            className={`w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a96e]/50 outline-none transition-all resize-none ${icon ? "pl-10" : ""}`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            dir={dir}
            placeholder={placeholder}
            step={type === "number" ? "0.01" : undefined}
            className={`w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a96e]/50 outline-none transition-all ${icon ? "pl-10" : ""}`}
          />
        )}
      </div>
    </div>
  );
}

function ImageUpload({
  value,
  onChange,
  quickSelect = [],
}: {
  value: string;
  onChange: (v: string) => void;
  quickSelect?: string[];
}) {
  const [imageError, setImageError] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
      setImageError(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      <Field label="Product Image" value={value} onChange={(v) => { onChange(v); setImageError(false); }} icon={<ImageIcon className="w-4 h-4" />} placeholder="Paste image URL or upload file..." />

      <div className="mt-3 flex gap-4">
        {/* Preview */}
        <div className="w-36 h-36 rounded-xl overflow-hidden relative border border-[#2a2a2a] bg-[#1a1a1a] flex-shrink-0">
          {!imageError && value ? (
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="144px"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
              <ImageIcon className="w-8 h-8 mb-1" />
              <span className="text-[10px]">No image</span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          {/* Upload button */}
          <label
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
              dragActive
                ? "border-[#c9a96e] bg-[#c9a96e]/10"
                : "border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#c9a96e]/50"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
            />
            <ImageIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-xs font-medium">Upload from device</span>
          </label>

          {/* Quick select */}
          {quickSelect.length > 0 && (
            <>
              <p className="text-gray-500 text-[10px]">Quick select</p>
              <div className="grid grid-cols-4 gap-2">
                {quickSelect.map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => { onChange(img); setImageError(false); }}
                    className="relative w-full aspect-square rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-[#c9a96e]/50 transition-all"
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessToast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="fixed top-24 right-4 z-[200] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-3 rounded-xl flex items-center gap-3 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
        >
          <Check className="w-4 h-4 text-emerald-400" />
        </motion.div>
      </div>
      <div>
        <div className="text-sm font-bold">{message}</div>
        <div className="text-emerald-400/60 text-[10px]">تم بنجاح</div>
      </div>
    </motion.div>
  );
}

function EditModal({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (id: string, data: Partial<Product>) => void;
}) {
  const [form, setForm] = useState({
    name: product.name,
    name_ar: product.name_ar,
    description: product.description,
    description_ar: product.description_ar,
    price: product.price.toString(),
    image: product.image,
    category: product.category,
    category_ar: product.category_ar,
    origin: product.origin,
    origin_ar: product.origin_ar,
    weight: product.weight,
    weight_ar: product.weight_ar,
    badge: product.badge || "",
    badge_ar: product.badge_ar || "",
    rating: product.rating.toString(),
    stock: product.stock.toString(),
    featured: product.featured,
  });

  const [activeTab, setActiveTab] = useState<"en" | "ar" | "details">("en");

  const handleSave = () => {
    onSave(product.id, {
      name: form.name,
      name_ar: form.name_ar,
      description: form.description,
      description_ar: form.description_ar,
      price: parseFloat(form.price) || 0,
      image: form.image,
      category: form.category as "Olives" | "Pickles",
      category_ar: form.category_ar,
      origin: form.origin,
      origin_ar: form.origin_ar,
      weight: form.weight,
      weight_ar: form.weight_ar,
      badge: form.badge || undefined,
      badge_ar: form.badge_ar || undefined,
      rating: parseFloat(form.rating) || 0,
      stock: parseInt(form.stock) || 0,
      featured: form.featured,
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-[100] flex items-start justify-center pt-10 px-4 overflow-y-auto pb-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="w-full max-w-3xl bg-[#111] rounded-2xl border border-[#2a2a2a] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-[#2a2a2a]">
              <Image src={form.image} alt={form.name} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Edit Product</h2>
              <p className="text-gray-500 text-sm">{product.id}</p>
            </div>
          </div>
          <button type="button" onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-red-400/50 transition-all cursor-pointer relative z-10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#2a2a2a]">
          {[
            { key: "en", label: "English" },
            { key: "ar", label: "العربية" },
            { key: "details", label: "Details" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 py-3 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "text-[#c9a96e] border-b-2 border-[#c9a96e]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {activeTab === "en" && (
            <>
              <Field label="Product Name (EN)" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Description (EN)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
              <Field label="Badge (EN)" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} placeholder="e.g. Premium, Best Seller, Spicy" />
            </>
          )}

          {activeTab === "ar" && (
            <>
              <Field label="اسم المنتج (AR)" value={form.name_ar} onChange={(v) => setForm({ ...form, name_ar: v })} dir="rtl" />
              <Field label="الوصف (AR)" value={form.description_ar} onChange={(v) => setForm({ ...form, description_ar: v })} textarea dir="rtl" />
              <Field label="البادج (AR)" value={form.badge_ar} onChange={(v) => setForm({ ...form, badge_ar: v })} dir="rtl" placeholder="مثلاً فاخر، الأكثر مبيعاً، حار" />
            </>
          )}

          {activeTab === "details" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Price ($)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" icon={<DollarSign className="w-4 h-4" />} />
                <Field label="Rating" value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} type="number" icon={<Star className="w-4 h-4" />} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Stock" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} type="number" icon={<Package className="w-4 h-4" />} />
                <div>
                  <label className="text-gray-400 text-xs font-medium tracking-wider uppercase mb-2 block">Category</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                      <Tag className="w-4 h-4" />
                    </div>
                    <select
                      value={form.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm({
                          ...form,
                          category: val,
                          category_ar: val === "Olives" ? "زيتون" : "مخللات",
                        });
                      }}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:border-[#c9a96e]/50 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Olives">🫒 Olives (زيتون)</option>
                      <option value="Pickles">🥒 Pickles (مخللات)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category (AR)" value={form.category_ar} onChange={(v) => setForm({ ...form, category_ar: v })} dir="rtl" />
                <Field label="Origin" value={form.origin} onChange={(v) => setForm({ ...form, origin: v })} icon={<Globe className="w-4 h-4" />} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Origin (AR)" value={form.origin_ar} onChange={(v) => setForm({ ...form, origin_ar: v })} dir="rtl" />
                <Field label="Weight" value={form.weight} onChange={(v) => setForm({ ...form, weight: v })} icon={<Weight className="w-4 h-4" />} />
              </div>
              <Field label="Weight (AR)" value={form.weight_ar} onChange={(v) => setForm({ ...form, weight_ar: v })} dir="rtl" />

              {/* Image Upload */}
              <ImageUpload
                value={form.image}
                onChange={(v) => setForm({ ...form, image: v })}
                quickSelect={["/product-images/01.webp", "/product-images/02.webp", "/product-images/03.webp", "/product-images/04.webp", "/product-images/05.webp", "/product-images/06.webp"]}
              />

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-[#2a2a2a] bg-[#1a1a1a] text-[#c9a96e] focus:ring-[#c9a96e]/20"
                />
                <span className="text-gray-300 text-sm">Featured Product</span>
              </label>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-[#2a2a2a]">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#2a2a2a] text-gray-400 font-medium hover:text-white hover:border-[#c9a96e]/30 transition-all">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 btn-gold py-3 rounded-xl font-bold flex items-center justify-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AddProductModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (data: Omit<Product, "id">) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    name_ar: "",
    description: "",
    description_ar: "",
    price: "",
    image: "/product-images/01.webp",
    category: "Olives" as "Olives" | "Pickles",
    category_ar: "زيتون",
    origin: "",
    origin_ar: "",
    weight: "",
    weight_ar: "",
    badge: "",
    badge_ar: "",
    rating: "4.5",
    stock: "100",
    featured: false,
  });

  const [activeTab, setActiveTab] = useState<"en" | "ar" | "details">("en");

  const handleAdd = () => {
    onAdd({
      name: form.name || "New Product",
      name_ar: form.name_ar || "منتج جديد",
      description: form.description || "Premium quality product",
      description_ar: form.description_ar || "منتج بجودة ممتازة",
      price: parseFloat(form.price) || 9.99,
      image: form.image,
      category: form.category,
      category_ar: form.category_ar,
      origin: form.origin || "Morocco",
      origin_ar: form.origin_ar || "المغرب",
      weight: form.weight || "500g",
      weight_ar: form.weight_ar || "500 جرام",
      badge: form.badge || undefined,
      badge_ar: form.badge_ar || undefined,
      rating: parseFloat(form.rating) || 4.5,
      stock: parseInt(form.stock) || 100,
      featured: form.featured,
      reviews: 0,
      created_at: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-[100] flex items-start justify-center pt-10 px-4 overflow-y-auto pb-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="w-full max-w-3xl bg-[#111] rounded-2xl border border-[#2a2a2a] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center">
              <Plus className="w-6 h-6 text-[#c9a96e]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add New Product</h2>
              <p className="text-gray-500 text-sm">منتج جديد</p>
            </div>
          </div>
          <button type="button" onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-red-400/50 transition-all cursor-pointer relative z-10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#2a2a2a]">
          {[
            { key: "en", label: "English" },
            { key: "ar", label: "العربية" },
            { key: "details", label: "Details" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 py-3 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "text-[#c9a96e] border-b-2 border-[#c9a96e]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {activeTab === "en" && (
            <>
              <Field label="Product Name (EN)" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g. Kalamata Olives" />
              <Field label="Description (EN)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea placeholder="Premium olives from..." />
              <Field label="Badge (EN)" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} placeholder="e.g. Premium, Best Seller" />
            </>
          )}

          {activeTab === "ar" && (
            <>
              <Field label="اسم المنتج (AR)" value={form.name_ar} onChange={(v) => setForm({ ...form, name_ar: v })} dir="rtl" placeholder="زيتون كالاماتا" />
              <Field label="الوصف (AR)" value={form.description_ar} onChange={(v) => setForm({ ...form, description_ar: v })} textarea dir="rtl" placeholder="زيتون فاخر من..." />
              <Field label="البادج (AR)" value={form.badge_ar} onChange={(v) => setForm({ ...form, badge_ar: v })} dir="rtl" placeholder="مثلاً فاخر، الأكثر مبيعاً" />
            </>
          )}

          {activeTab === "details" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Price ($)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" icon={<DollarSign className="w-4 h-4" />} placeholder="9.99" />
                <Field label="Rating" value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} type="number" icon={<Star className="w-4 h-4" />} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Stock" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} type="number" icon={<Package className="w-4 h-4" />} />
                <div>
                  <label className="text-gray-400 text-xs font-medium tracking-wider uppercase mb-2 block">Category</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                      <Tag className="w-4 h-4" />
                    </div>
                    <select
                      value={form.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm({
                          ...form,
                          category: val as "Olives" | "Pickles",
                          category_ar: val === "Olives" ? "زيتون" : "مخللات",
                        });
                      }}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:border-[#c9a96e]/50 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Olives">🫒 Olives (زيتون)</option>
                      <option value="Pickles">🥒 Pickles (مخللات)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Origin" value={form.origin} onChange={(v) => setForm({ ...form, origin: v })} icon={<Globe className="w-4 h-4" />} placeholder="Morocco" />
                <Field label="Weight" value={form.weight} onChange={(v) => setForm({ ...form, weight: v })} icon={<Weight className="w-4 h-4" />} placeholder="500g" />
              </div>

              {/* Image Upload */}
              <ImageUpload
                value={form.image}
                onChange={(v) => setForm({ ...form, image: v })}
                quickSelect={["/product-images/01.webp", "/product-images/02.webp", "/product-images/03.webp", "/product-images/04.webp", "/product-images/05.webp", "/product-images/06.webp"]}
              />

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-[#2a2a2a] bg-[#1a1a1a] text-[#c9a96e] focus:ring-[#c9a96e]/20"
                />
                <span className="text-gray-300 text-sm">Featured Product</span>
              </label>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-[#2a2a2a]">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#2a2a2a] text-gray-400 font-medium hover:text-white hover:border-[#c9a96e]/30 transition-all">
            Cancel
          </button>
          <button onClick={handleAdd} className="flex-1 btn-gold py-3 rounded-xl font-bold flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminPage() {
  const { isAuthenticated, login, logout, overrides, setOverride } = useAdminStore();
  const products = useProducts();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "Olives" | "Pickles">("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string) => {
    setToast({ message, key: Date.now() });
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => categoryFilter === "all" || p.category === categoryFilter)
      .filter((p) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.name_ar.includes(search) ||
          p.id.includes(q)
        );
      });
  }, [products, search, categoryFilter]);

  const stats = useMemo(() => {
    const edited = Object.keys(overrides).length;
    const newProducts = Object.entries(overrides).filter(
      ([id]) => !products.find((p) => p.id === id)
    ).length;
    return {
      total: products.length + newProducts,
      olives: products.filter((p) => p.category === "Olives").length + Object.values(overrides).filter((o, i) => {
        const id = Object.keys(overrides)[i];
        return !products.find((p) => p.id === id) && o.category === "Olives";
      }).length,
      pickles: products.filter((p) => p.category === "Pickles").length + Object.values(overrides).filter((o, i) => {
        const id = Object.keys(overrides)[i];
        return !products.find((p) => p.id === id) && o.category === "Pickles";
      }).length,
      edited,
    };
  }, [products, overrides]);

  const handleSave = (id: string, data: Partial<Product>) => {
    setOverride(id, data);
    showToast("تم تعديل المنتج بنجاح");
  };

  const handleAddProduct = (data: Omit<Product, "id">) => {
    const id = `product-${Date.now()}`;
    setOverride(id, data);
    showToast("تم إضافة المنتج بنجاح");
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Success Toast */}
      <AnimatePresence>
        {toast && (
          <SuccessToast key={toast.key} message={toast.message} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="border-b border-[#2a2a2a] bg-[#111] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#c9a96e]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-500 text-xs">{stats.total} products</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-[#c9a96e] text-[#0a0a0a] text-sm font-bold flex items-center gap-2 hover:bg-[#d4b87a] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Product</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl border border-[#2a2a2a] text-gray-400 text-sm font-medium hover:text-white hover:border-[#c9a96e]/30 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Products", value: stats.total, icon: Package },
            { label: "Olives", value: stats.olives, icon: () => <span className="text-lg">🫒</span> },
            { label: "Pickles", value: stats.pickles, icon: () => <span className="text-lg">🥒</span> },
            { label: "Edited", value: stats.edited, icon: Edit3, color: "text-[#c9a96e]" },
          ].map((s, i) => (
            <div key={i} className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                  <s.icon className={`w-5 h-5 ${s.color || "text-gray-500"}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-gray-500 text-[10px] tracking-wider uppercase">{s.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#111] border border-[#2a2a2a] text-white placeholder-gray-600 rounded-xl pl-12 pr-4 py-3 focus:border-[#c9a96e]/50 outline-none transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#c9a96e]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {(["all", "Olives", "Pickles"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                  categoryFilter === cat
                    ? "bg-[#c9a96e] text-[#0a0a0a] border-[#c9a96e]"
                    : "bg-[#111] text-gray-400 border-[#2a2a2a] hover:border-[#c9a96e]/30"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2a]">
                  <th className="text-left text-gray-500 text-[10px] tracking-wider uppercase px-6 py-4 font-medium">Product</th>
                  <th className="text-left text-gray-500 text-[10px] tracking-wider uppercase px-6 py-4 font-medium hidden md:table-cell">Category</th>
                  <th className="text-left text-gray-500 text-[10px] tracking-wider uppercase px-6 py-4 font-medium">Price</th>
                  <th className="text-left text-gray-500 text-[10px] tracking-wider uppercase px-6 py-4 font-medium hidden lg:table-cell">Rating</th>
                  <th className="text-left text-gray-500 text-[10px] tracking-wider uppercase px-6 py-4 font-medium hidden lg:table-cell">Stock</th>
                  <th className="text-left text-gray-500 text-[10px] tracking-wider uppercase px-6 py-4 font-medium">Status</th>
                  <th className="text-right text-gray-500 text-[10px] tracking-wider uppercase px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const isEdited = !!overrides[product.id];
                  return (
                    <tr key={product.id} className="border-b border-[#2a2a2a]/50 hover:bg-[#1a1a1a]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0">
                            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-white text-sm truncate max-w-[200px]">{product.name}</div>
                            <div className="text-gray-500 text-xs truncate max-w-[200px]">{product.name_ar}</div>
                            <div className="text-gray-600 text-[10px] mt-0.5">{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-xs font-medium text-gray-400 bg-[#1a1a1a] px-3 py-1 rounded-lg border border-[#2a2a2a]">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#c9a96e] font-bold text-sm">${product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#c9a96e] text-[#c9a96e]" />
                          <span className="text-gray-400 text-sm">{product.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-gray-400 text-sm">{product.stock}</span>
                      </td>
                      <td className="px-6 py-4">
                        {isEdited ? (
                          <span className="text-[#c9a96e] text-[10px] font-semibold bg-[#c9a96e]/10 px-3 py-1 rounded-lg border border-[#c9a96e]/20">
                            EDITED
                          </span>
                        ) : (
                          <span className="text-gray-600 text-[10px] font-medium bg-[#1a1a1a] px-3 py-1 rounded-lg border border-[#2a2a2a]">
                            DEFAULT
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal - AnimatePresence in PARENT */}
      <AnimatePresence>
        {editingProduct && (
          <EditModal
            key={editingProduct.id}
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      {/* Add Product Modal - AnimatePresence in PARENT */}
      <AnimatePresence>
        {showAddModal && (
          <AddProductModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
