import type {NextRequest} from 'next/server'

export const runtime = 'edge'
export const fetchCache = 'default-cache'

const api = 'https://json.excalidraw.com/api/v2/'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const id = searchParams.get('id')

    if (null === id) {
        return Response.json({error: 'No params provided'}, {status: 400})
    }

    const res = await fetch(`${api}${id}`)

    if (!res.ok) {
        return Response.json({error: 'Could not find the file.'}, {status: 404})
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/octet-stream'
    }
    const contentLength = res.headers.get('Content-Length')
    if (null === contentLength) {
        headers['Transfer-Encoding'] = 'chunked'
    } else {
        headers['Content-Length'] = contentLength
    }

    return new Response(res.body, {
        status: 200,
        headers: headers,
    })
}
