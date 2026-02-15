import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

export interface Tag {
    name: string
    color: string
}

export interface Category {
    name: string
    color: string
}

export interface Friend {
    name: string
    link: string
    avatar: string
}

export interface PostMeta {
    id: string
    slug: string
    title: string
    date: string
    excerpt: string
    cover: string
    tags: Tag[]
    category: Category
}

export interface PostsResponse {
    posts: PostMeta[]
    nextCursor: string | null
    hasMore: boolean
}

interface PostQuery {
    pageSize: number
    cursor?: string
}

export type Block = ({
    has_children: true
    children: Block[]
} | {
    has_children: false
    children: null
}) & BlockObjectResponse

export type DbSelect = {
    type: 'all',
} | {
    type: 'slug',
    slug: string
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
