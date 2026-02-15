import {getPosts} from '~/libs/notion.server'

interface SitemapItem {
    url: string
    lastModified?: string | Date | undefined
    changeFrequency?: 'always' | 'never' | 'daily' | 'hourly' | 'weekly' | 'monthly' | 'yearly' | undefined
    priority?: number | undefined
}

export async function loader() {
    const sitemap: SitemapItem[] = [
        {
            url: 'https://blog.truimo.com',
            changeFrequency: 'daily',
            priority: 1,
        }
    ]

    const response = await getPosts()

    response.posts.forEach(post => {
        sitemap.push({
            url: `https://blog.truimo.com/posts/${post.slug}`,
            lastModified: new Date(post.date).toISOString(),
            changeFrequency: 'weekly'
        })
    })

    const list = sitemap.map((item) => {
        const it: Array<string> = new Array(1)

        it[0] = `<loc>${item.url}</loc>`

        if (void 0 != item.lastModified) {
            const time: string = typeof item.lastModified === 'string' ? item.lastModified : item.lastModified.toISOString()
            it.push(`<lastmod>${time}</lastmod>`)
        }

        if (void 0 != item.changeFrequency) {
            it.push(`<changefreq>${item.changeFrequency}</changefreq>`)
        }

        if (void 0 != item.priority) {
            it.push(`<priority>${item.priority}</priority>`)
        }

        const text: string = it.join('\n')

        return `<url>${text}</url>`
    })

    const body = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...list,
        '</urlset>'
    ].join('\n')

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml',
        }
    })
}
