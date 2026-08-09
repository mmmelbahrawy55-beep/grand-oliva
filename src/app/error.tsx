"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">⚠️</div>
        <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Something went wrong
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#c9a96e] to-[#b8985d] text-[#0a0a0a] font-bold transition-all active:scale-[0.97]"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 rounded-xl border border-[#c9a96e]/25 text-[#c9a96e] font-bold hover:bg-[#c9a96e]/[0.08] transition-all active:scale-[0.97]"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
