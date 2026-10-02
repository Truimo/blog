import type { Handle } from 'remix/component'
import { Document } from './document.tsx'
import type { PostsResponse, PostMeta } from '../types.d.ts'
import { routes } from '../routes.ts'
import { blogLink, blogTitle } from '../site-info.ts'
import { Time, Category, Tags } from './post-meta.tsx'
import { BackButton } from '../assets/back-button.tsx'

export function HomePage(handle: Handle<{ data: PostsResponse; cursor?: string }>) {
    return () => {
        const { data, cursor } = handle.props
        return (
            <Document title={blogTitle} canonical={blogLink}>
                <h1 class="sr-only">{blogTitle}</h1>
                <div class="flex flex-col">
                    {data.posts.map((post) => (
                        <PostItem key={post.slug} post={post} />
                    ))}
                </div>
                <Pagination
                    hasMore={data.hasMore}
                    nextCursor={data.nextCursor}
                    hasPrev={!!cursor}
                />
            </Document>
        )
    }
}

function Pagination(handle: Handle<{ hasMore: boolean; nextCursor: string | null; hasPrev: boolean }>) {
    return () => {
        const { hasMore, nextCursor, hasPrev } = handle.props
        return (
            <nav class="flex justify-end items-center gap-4 mt-12 mb-4" aria-label="分页">
                {hasPrev && (
                    <BackButton label="← 上一页" />
                )}
                {hasMore && nextCursor && (
                    <a
                        class="px-4 py-2 text-sm border border-separator rounded-sm text-ink hover:text-accent-strong hover:border-accent transition-colors"
                        href={`${routes.home.href()}?cursor=${encodeURIComponent(nextCursor)}`}
                        rel="next"
                    >
                        下一页 →
                    </a>
                )}
            </nav>
        )
    }
}

function PostItem(handle: Handle<{ post: PostMeta }>) {
    return () => {
        const { post } = handle.props
        return (
            <article class="py-8 border-b border-separator last:border-b-0">
                <div class="flex flex-col justify-between gap-1.5 md:flex-row md:items-baseline">
                    <div>
                        <p class="text-sm text-ink-secondary">
                            <Time datetime={post.date} />
                            <span class="px-2" aria-hidden="true">•</span>
                            <Category category={post.category} />
                        </p>
                    </div>
                    <div>
                        <p class="text-sm space-x-2">
                            <Tags tags={post.tags} />
                        </p>
                    </div>
                </div>
                <h2 class="mt-2 mb-2 text-xl md:text-2xl font-semibold tracking-tight leading-snug">
                    <a class="hover:text-accent-strong transition-colors" href={routes.post.href({ slug: post.slug })}>{post.title}</a>
                </h2>
                <p class="leading-relaxed text-ink-secondary">{post.excerpt}</p>
            </article>
        )
    }
}
