import {unfurl} from 'unfurl.js'
import type {NextRequest} from 'next/server'


export async function POST(request: NextRequest) {
    const body = await request.json()

    if (!body.url) {
        return Response.json({error: 'No URL provided'}, {status: 400})
    }

    const result = await unfurl(body.url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
        }
    })

    return Response.json(result)
}
