import {Client, isFullPage} from "@notionhq/client";
import type {DbSelect, Post} from "./types";

const notion = new Client({
    auth: process.env.NOTION_KEY,
    baseUrl: 'https://proxy.20mo.cn/notion-api'
})

export async function getDatabase(select: DbSelect = {type: 'all'}) {
    const where = []
    switch (select.type) {
        case 'slug':
            where.push({
                property: 'Slug',
                type: 'rich_text',
                rich_text: {
                    equals: select.slug
                }
            })
            break
    }
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
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
            }, ...where]
        },
        sorts: [{
            property: 'Date',
            direction: 'descending'
        }]
    })
    const arr = []
    if (response.object === 'list') {
        for (const it of response.results) {
            if (!isFullPage(it)) {
                continue
            }
            const properties = it.properties
            const slug = properties.Slug.type === 'rich_text' && properties.Slug.rich_text[0]?.plain_text
            const title = properties.Title.type === 'title' && properties.Title.title.slice(-1)[0]?.plain_text
            const date = properties.Date.type === 'date' && properties.Date.date?.start
            const excerpt = properties.Excerpt.type === 'rich_text' && properties.Excerpt.rich_text[0]?.plain_text
            const cover = properties.Cover.type === 'rich_text' && properties.Cover.rich_text[0]?.plain_text
            const tags = properties.Tags.type === 'multi_select' && properties.Tags.multi_select.map(tag => ({
                name: tag.name, color: tag.color
            }))
            const category = properties.Category.type === 'select' && {
                name: properties.Category.select ? properties.Category.select.name : '默认分类',
                color: properties.Category.select ? properties.Category.select.color : 'default'
            }
            const post: Post = {
                id: it.id,
                slug: slug || '',
                title: title || '',
                date: date || Date(),
                excerpt: excerpt || '',
                cover: cover || '',
                tags: tags || [],
                category: category,
            }
            arr.push(post)
        }
    }
    return arr;
}

export async function getBlocks(id: string) {
    const injectChildren = async (block: any, fetcher: Function) => {
        const response = await fetcher(block.id);
        return {...block, children: response};
    }
    const rawBlocks = await notion.blocks.children.list({
        block_id: id,
        page_size: 100,
    })
    if (rawBlocks.object === 'list') {
        let blocks = rawBlocks.results
        if (rawBlocks.has_more) {
            let cursor = rawBlocks.next_cursor
            do {
                const additional = await notion.blocks.children.list({
                    block_id: id,
                    page_size: 100,
                    start_cursor: cursor || undefined,
                })
                if (additional.object === 'list') {
                    blocks = [...blocks, ...additional.results]
                }
                cursor = additional.next_cursor
            } while (cursor)
        }
        return Promise.all(
            blocks.map((it: any) => {
                const {object, created_time, last_edited_time, created_by, last_edited_by, parent, ...lite} = it
                if (it.has_children) {
                    return injectChildren(lite, getBlocks)
                }
                return Promise.resolve({
                    ...lite
                })
            })
        )
    }
    return []
}
