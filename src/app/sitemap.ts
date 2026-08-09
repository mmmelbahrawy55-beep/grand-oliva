import { MetadataRoute } from "next";

const BASE_URL = "https://grand-oliva.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/cart`, lastModified: new Date(), changeFrequency: "never" as const, priority: 0.3 },
    { url: `${BASE_URL}/checkout`, lastModified: new Date(), changeFrequency: "never" as const, priority: 0.3 },
  ];

  return staticPages;
}
