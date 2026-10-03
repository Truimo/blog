import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/notion";
import { blogLink } from "@/lib/site-info";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: blogLink,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${blogLink}/friends`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  try {
    let cursor: string | null | undefined;
    let hasMore = true;
    while (hasMore) {
      const response = await getPosts({
        pageSize: 100,
        cursor: cursor ?? undefined,
      });
      for (const post of response.posts) {
        const time =
          post.date && !Number.isNaN(new Date(post.date).getTime())
            ? new Date(post.date).toISOString()
            : undefined;
        entries.push({
          url: `${blogLink}/post/${post.slug}`,
          lastModified: time,
          changeFrequency: "weekly",
        });
      }
      hasMore = response.hasMore;
      cursor = response.nextCursor;
    }
  } catch {
    // Return the static entries if Notion is unreachable.
  }

  return entries;
}
