import type {Route} from './+types/posts'
import {getPosts} from '~/libs/notion.server'

export async function loader({request}: Route.LoaderArgs) {
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')

    try {
        const data = await getPosts({
            pageSize: 10,
            cursor: cursor ?? undefined
        })
        return Response.json(data)
    } catch {
        return Response.json({error: 'Failed to fetch posts'}, {status: 500})
    }
}
