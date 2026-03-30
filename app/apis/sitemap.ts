import {getPosts} from '~/libs/notion.server'
import {blogLink} from '~/site-info'

interface SitemapItem {
    url: string
    lastModified?: string | Date
    changeFrequency?: 'always' | 'never' | 'daily' | 'hourly' | 'weekly' | 'monthly' | 'yearly'
    priority?: number
}

const buildSitemapEntry = (item: SitemapItem): string => {
    const parts: string[] = [`<loc>${item.url}</loc>`]

    if (item.lastModified !== undefined) {
        const time = typeof item.lastModified === 'string'
            ? item.lastModified
            : item.lastModified.toISOString()
        parts.push(`<lastmod>${time}</lastmod>`)
    }
    if (item.changeFrequency !== undefined) {
        parts.push(`<changefreq>${item.changeFrequency}</changefreq>`)
    }
    if (item.priority !== undefined) {
        parts.push(`<priority>${item.priority}</priority>`)
    }

    return `<url>${parts.join('\n')}</url>`
}

export async function loader() {
    try {
        const sitemap: SitemapItem[] = [
            {url: blogLink, changeFrequency: 'daily', priority: 1}
        ]

        // Paginate through all posts to ensure sitemap is complete
        let cursor: string | null | undefined = undefined
        let hasMore = true
        while (hasMore) {
            const response = await getPosts({pageSize: 100, cursor: cursor ?? undefined})
            response.posts.forEach(post => {
                sitemap.push({
                    url: `${blogLink}/posts/${post.slug}`,
                    lastModified: new Date(post.date).toISOString(),
                    changeFrequency: 'weekly'
                })
            })
            hasMore = response.hasMore
            cursor = response.nextCursor
        }

        const body = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...sitemap.map(buildSitemapEntry),
            '</urlset>'
        ].join('\n')

        return new Response(body, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            }
        })
    } catch {
        return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>', {
            status: 500,
            headers: {'Content-Type': 'application/xml'}
        })
    }
}
