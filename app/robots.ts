import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/deck", "/movemint-redesign", "/proto", "/api"] },
    sitemap: "https://zoeyyandesign.vercel.app/sitemap.xml",
  };
}
