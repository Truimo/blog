import { cacheLife } from "next/cache";
import { getPosts } from "@/lib/notion";
import { blogDescription, blogLink, blogTitle } from "@/lib/site-info";
import type { PostMeta } from "@/types";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderItem(post: PostMeta): string {
  const link = `${blogLink}/post/${post.slug}`;
  const pubDate = post.date ? new Date(post.date).toUTCString() : "";
  const description = post.excerpt
    ? escapeXml(post.excerpt)
    : `本篇文章有关：${escapeXml(post.title)}，来自${escapeXml(blogDescription)}。`;
  return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
    <description>${description}</description>
    <category>${escapeXml(post.category.name)}</category>
  </item>`;
}

function renderRss(posts: PostMeta[]): string {
  // 用最新文章日期做 lastBuildDate，避免 build 期的非确定性 Date.now()
  const lastBuildDate = posts[0]?.date
    ? new Date(posts[0].date).toUTCString()
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(blogTitle)}</title>
  <link>${blogLink}</link>
  <description>${escapeXml(blogDescription)}</description>
  <language>zh-CN</language>
  <atom:link href="${blogLink}/feed" rel="self" type="application/rss+xml" />
  ${lastBuildDate ? `<lastBuildDate>${lastBuildDate}</lastBuildDate>` : ""}
${posts.map(renderItem).join("\n")}
</channel>
</rss>`;
}

// use cache 不能直接写在 GET 里，抽成 helper（Next 16 Cache Components 要求）
async function buildFeed(): Promise<string> {
  "use cache";
  cacheLife("hours");
  const { posts } = await getPosts({ pageSize: 20 });
  return renderRss(posts);
}

export async function GET() {
  return new Response(await buildFeed(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
