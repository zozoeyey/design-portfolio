import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const BASE = "https://zoeyyandesign.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE },
    { url: `${BASE}/about` },
    { url: `${BASE}/playground` },
    ...projects.filter((p) => !p.comingSoon).map((p) => ({ url: `${BASE}/work/${p.slug}` })),
  ];
}
