import type {NextRequest} from 'next/server'
import { Buffer } from 'node:buffer'
import { verifyCamoUrl } from '@/libs/camo'

type Params = Promise<{
    hash: string
    hex: string
}>

const UA: string = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const referer = request.headers.get('Referer')
    if (referer === null) {
        return new Response('Exception Request', {
            status: 400,
        })
    }

    const { hash, hex } = await params

    try {
        const imageUrl = Buffer.from(hex, 'hex').toString('utf8')
        if (!verifyCamoUrl(imageUrl, hash)) {
            return new Response('Bad Signature', { status: 403 })
        }

        const ua = request.headers.get('User-Agent'), url = new URL(imageUrl)
        const res = await fetch(url, {
            headers: {
                'User-Agent': ua === null ? UA : ua,
                'Referer': `${url.origin}/?camo=blog.truimo.com`
            },
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
    } catch (error) {
        console.error('Image camo error:', error)
        return new Response('Failed to GET image', { status: 500 })
    }
}
