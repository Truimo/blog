export interface Post {
    id: string,
    slug: string,
    title: string,
    excerpt: string,
    date: string,
    tags: Array<{ name: string, color: string }>,
    category: { name: string, color: string },
    cover: string,
}

export type DbSelect = {
    type: 'all',
} | {
    type: 'slug',
    slug: string
}
