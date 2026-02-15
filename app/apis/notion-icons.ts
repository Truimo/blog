import type {Route} from './+types/notion-icons'

export async function loader({params, request}: Route.LoaderArgs) {
    const url = `https://www.notion.so/icons/${params.filename}`

    const res = await fetch(url, {
        method: 'GET',
        headers: request.headers,
    })

    const buffer = await res.arrayBuffer()

    const headers: Record<string, string> = {
        'Content-Type': 'application/octet-stream',
        'Cache-Control': 'public, max-age=604800, immutable'
    }
    const contentType = res.headers.get('Content-Type'),
        contentLength = res.headers.get('Content-Length')
    if (null !== contentType) {
        headers['Content-Type'] = contentType
    }
    if (null !== contentLength) {
        headers['Content-Length'] = contentLength
    }

    return new Response(buffer, {
        headers: headers
    })
}
