
import process from 'node:process'
import {isFullBlock} from '@notionhq/client'
import {getBlockObject} from '../libs/notion.server.ts'

const {
    NOTION_CREATOR_ID: CREATOR_ID = 'your-creator-id'
} = process.env

export async function loader({params, request}: any) {
    const id: string = params.id

    try {
        const block = await getBlockObject(id)

        if (isFullBlock(block) && CREATOR_ID === block.created_by.id) {
            if (block.type === 'video' && block.video.type === 'file') {
                return Response.redirect(block.video.file.url, 302)
            }
        }

        return new Response('Not Found', {
            status: 404,
        })
    } catch (error) {
        console.error('File GET error:', error)
        return new Response('Failed to GET video', {status: 500})
    }
}
