import type {Route} from './+types/bookmark'
import {unfurl} from 'unfurl.js'

interface Body {
    url: string | undefined
}

const userAgent: string = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'

export async function action({request}: Route.ActionArgs) {
    const body: Body = await request.json()

    if (typeof body.url !== 'string') {
        return Response.json({error: 'No URL provided'}, {status: 400})
    }

    try {
        const result = await unfurl(body.url, {
            headers: {
                'User-Agent': userAgent
            }
        })

        return Response.json(result)
    } catch (e) {
        return Response.json({error: 'Illegal request'}, {status: 400})
    }
}

export async function loader() {
    return Response.json({error: 'Not Found'}, {status: 404})
}
