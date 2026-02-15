import type {Route} from './+types/posts'
import {getPosts} from '~/libs/notion.server'

export async function loader({request}: Route.LoaderArgs) {
    const url = new URL(request.url)
    const searchParams = url.searchParams
    const cursor = searchParams.get('cursor')
    const data = await getPosts({
        pageSize: 10,
        cursor: cursor ? cursor : undefined
    })
    return Response.json(data)
}
