import type {MetadataRoute} from 'next'
import {getPosts} from "@/libs/notion";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemap: MetadataRoute.Sitemap = [
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
            changeFrequency: 'daily'
        })
    })

    return sitemap
}
