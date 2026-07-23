import type { Metadata } from "next";
import { Geist, Playfair_Display, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Grand Oliva | أجود أنواع الزيتون والمخللات",
    template: "%s | Grand Oliva",
  },
  description:
    "جدة أولاً - أجود أنواع الزيتون والمخللات الطبيعية المصنوعة يدوياً بأجود المكونات من البحر الأبيض المتوسط",
  keywords: ["زيتون", "مخللات", "Grand Oliva", "olives", "pickles", "natural", "طبيعي", "زيتون زيت", "مخللات خضروات"],
  authors: [{ name: "Grand Oliva" }],
  creator: "Grand Oliva",
  publisher: "Grand Oliva",
  metadataBase: new URL("https://grand-oliva.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://grand-oliva.vercel.app",
    siteName: "Grand Oliva",
    title: "Grand Oliva | أجود أنواع الزيتون والمخللات",
    description: "أجود أنواع الزيتون والمخللات الطبيعية المصنوعة يدوياً بأجود المكونات من البحر الأبيض المتوسط",
    images: [
      {
        url: "https://images.pexels.com/photos/16732695/pexels-photo-16732695.jpeg?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Grand Oliva - Premium Olives & Pickles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grand Oliva | أجود أنواع الزيتون والمخللات",
    description: "أجود أنواع الزيتون والمخللات الطبيعية المصنوعة يدوياً بأجود المكونات",
    images: ["https://images.pexels.com/photos/16732695/pexels-photo-16732695.jpeg?w=1200&h=630&fit=crop&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geistSans.variable} ${playfair.variable} ${notoKufi.variable}`}>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
