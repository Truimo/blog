import type {Route} from './+types/notion-image'
import process from 'node:process'
import {isFullBlock} from '@notionhq/client'
import {getBlockObject} from '~/libs/notion'

const {
    NOTION_CREATOR_ID: CREATOR_ID = 'your-creator-id'
} = process.env

export async function loader({params, request}: Route.LoaderArgs) {
    const id: string = params.id

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
        return new Response('Failed to GET image', {status: 500})
    }
}
