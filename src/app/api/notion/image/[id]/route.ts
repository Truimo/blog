import type {NextRequest} from 'next/server'
import {isFullBlock} from '@notionhq/client'
import {getBlockObject} from '@/libs/notion'

type Params = Promise<{
    id: string
}>

const CREATOR_ID: string = process.env.NOTION_CREATOR_ID || 'your-creator-id'

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const { id } = await params

    try {
        const block = await getBlockObject(id)

        if (isFullBlock(block) && CREATOR_ID === block.created_by.id) {
            if (block.type === 'image' && block.image.type === 'file') {
                return Response.redirect(block.image.file.url, 302)
            }
        }

        return new Response('Not Found', {
            status: 404,
        })
    } catch (error) {
        console.error('File GET error:', error)
        return new Response('Failed to GET image', { status: 500 })
    }
}
