import {type NextRequest} from 'next/server'
import {getPosts} from '@/libs/notion'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const cursor = searchParams.get('cursor')
    const data = await getPosts({
        pageSize: 10,
        cursor: cursor ? cursor : undefined
    })
    return Response.json(data)
}
