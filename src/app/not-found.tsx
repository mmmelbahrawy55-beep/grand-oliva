import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#c9a96e] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#c9a96e] to-[#b8985d] text-[#0a0a0a] font-bold transition-all active:scale-[0.97] inline-block"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="px-8 py-4 rounded-xl border border-[#c9a96e]/25 text-[#c9a96e] font-bold hover:bg-[#c9a96e]/[0.08] transition-all active:scale-[0.97] inline-block"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
