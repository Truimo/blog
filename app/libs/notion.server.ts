import type {Block, PostMeta, PostQuery, PostsResponse} from '~/types'
import type {PageObjectResponse, RichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'
import process from 'node:process'
import crypto from 'node:crypto'
import {Redis} from '@upstash/redis'
import {Client, collectPaginatedAPI, isFullBlock, isFullPage} from '@notionhq/client'

const {
    NOTION_KEY = '',
    NOTION_DATABASE_ID = ''
} = process.env

const redis = Redis.fromEnv()

interface CachedHttpResponse {
    status: number
    statusText: string
    headers: Record<string, string>
    body: string
}

const createSHA256Hash = (input: string): string => {
    return crypto.createHash('sha256').update(input).digest('hex')
}

const notion = new Client({
    auth: NOTION_KEY,
    fetch: async (url, init) => {
        const method = (init?.method ?? 'GET').toUpperCase()

        if ('GET' === method) {
            const key = createSHA256Hash(url)
            try {
                const cached = await redis.get<CachedHttpResponse>(key)
                if (cached !== null) {
                    return new Response(cached.body, {
                        status: cached.status,
                        statusText: cached.statusText,
                        headers: cached.headers
                    })
                }

                const response = await fetch(url, init)
                if (response.ok) {
                    const body = await response.clone().text()
                    const headers = Object.fromEntries(response.headers.entries())
                    await redis.set(key, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: {
                            'content-type': headers['content-type']
                        },
                        body: body
                    }, {
                        ex: 3600
                    })
                }
                return response
            } catch {
                return fetch(url, init)
            }
        }

        return fetch(url, init)
    },
})

const databaseId = NOTION_DATABASE_ID

const getRichTextPlainText = (rich_text: RichTextItemResponse[]): string => {
    return rich_text.map(item => item.plain_text).join('')
}

const getPageMeta = (page: PageObjectResponse): PostMeta => {
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
    const response = await notion.dataSources.query({
        data_source_id: databaseId,
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
            if (isFullPage(page)) {
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
    const response = await notion.dataSources.query({
        data_source_id: databaseId,
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
            if (isFullPage(page)) {
                return getPageMeta(page)
            }
        }
    }
    return null
}

export const getPage = async (id: string): Promise<Block[]> => {
    const res = await collectPaginatedAPI(notion.blocks.children.list, {
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

export const getBlockObject = (blockId: string) => {
    return notion.blocks.retrieve({
        block_id: blockId,
    })
}
