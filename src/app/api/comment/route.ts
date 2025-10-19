import type {NextRequest} from 'next/server'
import type {Comment} from '@/@types/comments'
import {Client, isFullPage} from '@notionhq/client'
import {getRichTextPropertyOnly, getUrlPropertyOnly, getTtitlePropertyOnly} from '@/libs/notion-helper'

const notion = new Client({
    auth: process.env.NOTION_KEY, fetch
}), databaseId = process.env.NOTION_COMMENTS_DATABASE_ID || ''

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (null === id) {
        return Response.json({
            ok: 0,
            message: '找不到评论啦'
        }, {status: 404})
    }

    const response = await notion.dataSources.query({
        data_source_id: databaseId,
        filter: {
            and: [{
                property: 'Status',
                type: 'select',
                select: {
                    equals: 'show'
                }
            }, {
                property: 'Post',
                type: 'rich_text',
                rich_text: {
                    equals: id
                }
            }]
        },
        sorts: [
            {
                timestamp: "created_time",
                direction: "descending",
            },
        ],
    })

    if (response.results.length === 0) {
        return Response.json({
            ok: -1,
            message: '什么都没有嘛'
        })
    }

    const list: Comment[] = []

    for (const page of response.results) {
        if (isFullPage(page)) {
            const properties = page.properties
            list.push({
                nickname: getRichTextPropertyOnly(properties.Nickname),
                content: getTtitlePropertyOnly(properties.Content),
                link: getUrlPropertyOnly(properties.Link),
                floor: getRichTextPropertyOnly(properties.Floor),
                time: page.created_time
            })
        }
    }

    return Response.json({
        ok: 1,
        message: '好耶',
        list: list
    })
}
