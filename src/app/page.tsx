import { Suspense } from "react";
import { BackButton } from "@/components/client/back-button";
import { Category, Tags, Time } from "@/components/post-meta";
import { getPosts } from "@/lib/notion";
import { blogLink, blogTitle } from "@/lib/site-info";
import type { PostMeta } from "@/types";

export const metadata = {
  title: { absolute: blogTitle },
  alternates: { canonical: blogLink },
};

const PAGE_SIZE = 10;

export default function HomePage(props: PageProps<"/">) {
  return (
    <>
      <h1 className="sr-only">{blogTitle}</h1>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

async function PostList({
  searchParams,
}: Pick<PageProps<"/">, "searchParams">) {
  const { cursor } = await searchParams;
  const cursorStr = typeof cursor === "string" && cursor ? cursor : undefined;
  const data = await getPosts({ pageSize: PAGE_SIZE, cursor: cursorStr });

  return (
    <>
      <div className="flex flex-col">
        {data.posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
      <Pagination
        hasMore={data.hasMore}
        nextCursor={data.nextCursor}
        hasPrev={!!cursorStr}
      />
    </>
  );
}

function Pagination({
  hasMore,
  nextCursor,
  hasPrev,
}: {
  hasMore: boolean;
  nextCursor: string | null;
  hasPrev: boolean;
}) {
  return (
    <nav
      className="mt-12 mb-4 flex items-center justify-end gap-4"
      aria-label="分页"
    >
      {hasPrev && <BackButton label="← 上一页" />}
      {hasMore && nextCursor && (
        <a
          className="rounded-sm border border-separator px-4 py-2 text-ink text-sm transition-colors hover:border-accent hover:text-accent-strong"
          href={`/?cursor=${encodeURIComponent(nextCursor)}`}
          rel="next"
        >
          下一页 →
        </a>
      )}
    </nav>
  );
}

function PostItem({ post }: { post: PostMeta }) {
  return (
    <article className="border-separator border-b py-8 last:border-b-0">
      <div className="flex flex-col justify-between gap-1.5 md:flex-row md:items-baseline">
        <div>
          <p className="text-ink-secondary text-sm">
            <Time datetime={post.date} />
            <span className="px-2" aria-hidden="true">
              •
            </span>
            <Category category={post.category} />
          </p>
        </div>
        <div>
          <p className="space-x-2 text-sm">
            <Tags tags={post.tags} />
          </p>
        </div>
      </div>
      <h2 className="mt-2 mb-2 font-semibold text-xl leading-snug tracking-tight md:text-2xl">
        <a
          className="transition-colors hover:text-accent-strong"
          href={`/post/${post.slug}`}
        >
          {post.title}
        </a>
      </h2>
      <p className="text-ink-secondary leading-relaxed">{post.excerpt}</p>
    </article>
  );
}

function PostListSkeleton() {
  return (
    <div className="flex animate-pulse flex-col">
      {["s1", "s2", "s3"].map((k) => (
        <div key={k} className="border-separator border-b py-8 last:border-b-0">
          <div className="h-4 w-1/3 rounded bg-separator/40" />
          <div className="mt-3 h-6 w-2/3 rounded bg-separator/40" />
          <div className="mt-3 h-4 w-full rounded bg-separator/40" />
        </div>
      ))}
    </div>
  );
}
