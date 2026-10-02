import type { Handle } from 'remix/component'
import { unsafeHTML } from 'remix/component'
import { Document } from './document.tsx'
import type { PostMeta, Block } from '../types.d.ts'
import { blogLink, blogTitle, blogDescription, blogIcon } from '../site-info.ts'
import { Time, Category, Tags, PostCopyright } from './post-meta.tsx'
import { NotionRenderer } from './notion/notion-renderer.tsx'

export interface PostPageProps {
    post: PostMeta
    blocks: Block[]
}

export function PostPage(handle: Handle<PostPageProps>) {
    return () => {
        const { post, blocks } = handle.props
        const canonical = `${blogLink}/posts/${post.slug}`
        const description = post.excerpt.length === 0 ? `本篇文章有关：${post.title}，来自${blogDescription}。` : post.excerpt
        const jsonLd = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: description,
            datePublished: post.date,
            author: { '@type': 'Person', name: '浅小沫', url: blogLink },
            mainEntityOfPage: canonical,
            image: post.cover || undefined,
        }).replace(/</g, '\\u003c')

        return (
            <Document
                title={`${post.title} - ${blogTitle}`}
                description={description}
                canonical={canonical}
                image={post.cover || blogIcon}
                type="article"
                head={
                    <script type="application/ld+json" innerHTML={unsafeHTML(jsonLd)} />
                }
            >
                <div class="mx-auto max-w-3xl 2xl:max-w-4xl">
                    <header>
                        <p class="text-sm leading-normal break-words text-ink-secondary">
                            <Category category={post.category} />
                        </p>
                        <h1 class="mt-1 text-3xl md:text-4xl font-bold tracking-tight leading-tight">{post.title}</h1>
                        {post.excerpt.length > 0 && (
                            <p class="mt-2 leading-normal break-words text-ink-secondary">{post.excerpt}</p>
                        )}
                        <p class="mt-3 pb-3 leading-normal break-words space-x-2 text-sm text-ink-secondary border-b border-separator">
                            <Time datetime={post.date} />
                            <span aria-hidden="true">•</span>
                            <Tags tags={post.tags} />
                        </p>
                    </header>
                    <article class="article-body mt-6">
                        <NotionRenderer blocks={blocks} />
                    </article>
                    <PostCopyright slug={post.slug} title={post.title} />
                </div>
            </Document>
        )
    }
}
