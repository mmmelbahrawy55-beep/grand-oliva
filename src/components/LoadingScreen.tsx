"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-12"
          >
            {/* Rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full border border-[#c9a96e]/20 absolute inset-0"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="w-36 h-36 rounded-full border border-[#c9a96e]/10 absolute -inset-2"
            />

            {/* Center logo */}
            <div className="w-32 h-32 rounded-full bg-[#111] border border-[#c9a96e]/30 flex items-center justify-center relative">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[#c9a96e] text-4xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                G
              </motion.span>
              {/* Shine effect */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(201,169,110,0.1), transparent)",
                }}
              />
            </div>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1
              className="text-3xl font-bold text-white tracking-wider"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              GRAND OLIVA
            </h1>
            <p className="text-[#c9a96e]/60 text-xs tracking-[0.4em] uppercase mt-2">
              Premium Olives & Pickles
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative"
          >
            <div className="w-[200px] h-[2px] bg-[#2a2a2a] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#c9a96e] to-[#dfc08a]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[10px] text-gray-600 tracking-wider">
                {progress < 100 ? "LOADING..." : "WELCOME"}
              </span>
              <span className="text-[10px] text-[#c9a96e] tracking-wider">
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
