import {Client, isFullPageOrDatabase, collectPaginatedAPI, isFullBlock} from '@notionhq/client'
import type {
    BlockObjectResponse, PageObjectResponse, RichTextItemResponse, TextRichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints'

// export const revalidate = 60

const notion = new Client({
    auth: process.env.NOTION_KEY, fetch
}), databaseId = process.env.NOTION_DATABASE_ID || ''

interface PostQuery {
    pageSize: number
    cursor?: string
}

interface Tag {
    name: string
    color: string
}

interface Category {
    name: string
    color: string
}

interface PostMeta {
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

function getRichTextPlainText(rich_text: RichTextItemResponse[]): string {
    return rich_text.map(item => item.plain_text).join('')
}

function getPageMeta(page: PageObjectResponse): PostMeta {
    const properties = page.properties
    return {
        id: page.id,
        slug: properties.Slug.type === 'rich_text' ? getRichTextPlainText(properties.Slug.rich_text) : '',
        title: properties.Title.type === 'title' ? getRichTextPlainText(properties.Title.title) : '',
        date: properties.Date.type === 'date' && 'string' === typeof properties.Date.date?.start ? properties.Date.date.start : '',
        excerpt: properties.Excerpt.type === 'rich_text' ? getRichTextPlainText(properties.Excerpt.rich_text) : '',
        cover: properties.Cover.type === 'rich_text' ? getRichTextPlainText(properties.Cover.rich_text) : '',
        tags: page.properties.Tags.type === 'multi_select' ? page.properties.Tags.multi_select.map(tag => ({
            name: tag.name, color: tag.color
        })) : [],
        category: page.properties.Category.type === 'select' ? {
            name: page.properties.Category.select ? page.properties.Category.select.name : '默认分类',
            color: page.properties.Category.select ? page.properties.Category.select.color : 'default'
        } : {
            name: '默认分类',
            color: 'default'
        }
    }
}

export const getPosts = async (query: PostQuery = {
    pageSize: 10
}): Promise<PostsResponse> => {
    const response =  await notion.databases.query({
        database_id: databaseId,
        filter: {
            and: [{
                property: 'Status',
                type: 'select',
                select: {
                    equals: 'publish'
                }
            }, {
                property: 'Type',
                type: 'select',
                select: {
                    equals: 'post'
                }
            }]
        },
        sorts: [
            {
                property: "Date",
                direction: "descending",
            },
        ],
        page_size: query.pageSize,
        start_cursor: query.cursor,
    })
    const posts: PostMeta[] = []
    if ('list' === response.object) {
        for (const page of response.results) {
            if (isFullPageOrDatabase(page) && 'page' === page.object) {
                posts.push(getPageMeta(page))
            }
        }
    }
    return {
        posts: posts,
        nextCursor: response.next_cursor,
        hasMore: response.has_more
    }
}

export const getPost = async (slug: string): Promise<PostMeta | null> => {
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            and: [{
                property: 'Status',
                type: 'select',
                select: {
                    equals: 'publish'
                }
            }, {
                property: 'Type',
                type: 'select',
                select: {
                    equals: 'post'
                }
            }, {
                property: 'Slug',
                type: 'rich_text',
                rich_text: {
                    equals: slug
                }
            }]
        },
        page_size: 1
    })
    if ('list' === response.object) {
        for (const page of response.results) {
            if (isFullPageOrDatabase(page) && 'page' === page.object) {
                return getPageMeta(page)
            }
        }
    }
    return null
}

export type Block = ({
    has_children: true
    children: Block[]
} | {
    has_children: false
    children: null
}) & BlockObjectResponse

export const getPage = async (id: string): Promise<Block[]> => {
    const res =  await collectPaginatedAPI(notion.blocks.children.list, {
        block_id: id,
    })
    const blocks: Block[] = []
    for (const block of res.filter(isFullBlock)) {
        if (block.has_children) {
            const children = await getPage(block.id)
            blocks.push({
                ...block,
                has_children: true,
                children: children
            })
        } else {
            blocks.push({
                ...block,
                has_children: false,
                children: null
            })
        }
    }
    return blocks
}

export function getAnnotationsColor(color: string): string {
    switch (color) {
        case "default":
            return 'text-gray-900 dark:text-slate-100'
        case "gray":
            return 'text-gray-500'
        case "brown":
            return 'text-yellow-500'
        case "orange":
            return 'text-yellow-500'
        case "yellow":
            return 'text-yellow-500'
        case "green":
            return 'text-green-500'
        case "blue":
            return 'text-blue-500'
        case "purple":
            return 'text-purple-500'
        case "pink":
            return 'text-pink-500'
        case "red":
            return 'text-red-500'
        case "gray_background":
            return 'bg-gray-100'
        case "brown_background":
            return 'bg-yellow-100'
        case "orange_background":
            return 'bg-yellow-100'
        case "yellow_background":
            return 'bg-yellow-100'
        case "green_background":
            return 'bg-green-100'
        case "blue_background":
            return 'bg-blue-100'
        case "purple_background":
            return 'bg-purple-100'
        case "pink_background":
            return 'bg-pink-100'
        case "red_background":
            return 'bg-red-100'
        default:
            return ''
    }
}

export function getAnnotationsClass(annotations: TextRichTextItemResponse['annotations']) {
    const classes: string[] = []
    if (annotations.bold) {
        classes.push('font-bold')
    }
    if (annotations.italic) {
        classes.push('italic')
    }
    if (annotations.strikethrough) {
        classes.push('line-through')
    }
    if (annotations.underline) {
        classes.push('underline')
    }
    if (annotations.code) {
        classes.push('font-mono')
        classes.push('bg-gray-100 dark:bg-zinc-800')
        classes.push('p-1')
    }
    if (annotations.color) {
        classes.push(getAnnotationsColor(annotations.color))
    }
    return classes.join(' ')
}
