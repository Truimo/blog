export interface PostQuery {
    pageSize: number
    cursor: string
}

export interface PostMeta {
    id: string,
    slug: string,
    title: string,
    excerpt: string,
    date: string,
    tags: Array<Tag>,
    category: Category,
    cover: string,
}

export interface Tag {
    name: string,
    color: string,
}

export interface Category {
    name: string,
    color: string,
}

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
