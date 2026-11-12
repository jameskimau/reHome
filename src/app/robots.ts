import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const robots = (): MetadataRoute.Robots => {
  return {
    // Admin is also noindex; this stops crawlers from requesting it at all.
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
};

export default robots;
