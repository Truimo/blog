import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { NotionRenderer } from "@/components/notion/notion-renderer";
import { Category, PostCopyright, Tags, Time } from "@/components/post-meta";
import { getPage, getPost, getPostSlugs } from "@/lib/notion";
import {
  blogDescription,
  blogIcon,
  blogLink,
  blogTitle,
} from "@/lib/site-info";
import type { Block } from "@/types";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getPostMeta(slug: string) {
  return getPost(slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/post/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostMeta(slug);
  if (!post) return { title: "未找到文章" };

  const canonical = `${blogLink}/post/${post.slug}`;
  const description =
    post.excerpt.length === 0
      ? `本篇文章有关：${post.title}，来自${blogDescription}。`
      : post.excerpt;
  const image = post.cover || blogIcon;

  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${post.title} - ${blogTitle}`,
      description,
      publishedTime: post.date || undefined,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default function PostPage(props: PageProps<"/post/[slug]">) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostContent params={props.params} />
    </Suspense>
  );
}

async function PostContent({
  params,
}: Pick<PageProps<"/post/[slug]">, "params">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const blocks = await getPage(post.id);

  const canonical = `${blogLink}/post/${post.slug}`;
  const description =
    post.excerpt.length === 0
      ? `本篇文章有关：${post.title}，来自${blogDescription}。`
      : post.excerpt;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    datePublished: post.date,
    author: { "@type": "Person", name: "浅小沫", url: blogLink },
    mainEntityOfPage: canonical,
    image: post.cover || undefined,
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD with escaped angle brackets
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mx-auto max-w-3xl 2xl:max-w-4xl">
        <header>
          <p className="break-words text-ink-secondary text-sm leading-normal">
            <Category category={post.category} />
          </p>
          <h1 className="mt-1 font-bold text-3xl leading-tight tracking-tight md:text-4xl">
            {post.title}
          </h1>
          {post.excerpt.length > 0 && (
            <p className="mt-2 break-words text-ink-secondary leading-normal">
              {post.excerpt}
            </p>
          )}
          <p className="mt-3 space-x-2 break-words border-separator border-b pb-3 text-ink-secondary text-sm leading-normal">
            <Time datetime={post.date} />
            <span aria-hidden="true">•</span>
            <Tags tags={post.tags} />
          </p>
        </header>
        <article className="article-body mt-6">
          <NotionRenderer blocks={blocks as Block[]} />
        </article>
        <PostCopyright slug={post.slug} title={post.title} />
      </div>
    </>
  );
}

function PostSkeleton() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse 2xl:max-w-4xl">
      <div className="h-4 w-1/4 rounded bg-separator/40" />
      <div className="mt-3 h-10 w-3/4 rounded bg-separator/40" />
      <div className="mt-3 h-4 w-1/2 rounded bg-separator/40" />
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full rounded bg-separator/40" />
        <div className="h-4 w-full rounded bg-separator/40" />
        <div className="h-4 w-2/3 rounded bg-separator/40" />
      </div>
    </div>
  );
}
