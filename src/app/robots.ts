import type { MetadataRoute } from "next";
import { blogLink } from "@/lib/site-info";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${blogLink}/sitemap.xml`,
  };
}
