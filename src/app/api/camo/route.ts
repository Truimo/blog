import type {NextRequest} from 'next/server'
import {urlSafeBase64Decode} from '@/libs/base64'

class ImageCache {
    private readonly buffer: ArrayBuffer
    private readonly contentType: string

    constructor(buffer: ArrayBuffer, contentType: string) {
        this.buffer = buffer
        this.contentType = contentType
    }

    getBuffer() {
        return this.buffer
    }

    getContentType() {
        return this.contentType
    }
}

const imageCache = new Map<string, ImageCache>()
const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

function b64(s: string | null) {
    if (s === null) {
        return ''
    }
    try {
        return urlSafeBase64Decode(s)
    } catch (e) {
        return ''
    }
}

function isImage(contentType: string | null): boolean {
    if (contentType === null) {
        throw new Error('Content-Type is null')
    }
    return contentType.startsWith('image')
}

async function camoImage(imageUrl: string) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/octet-stream',
        'Cache-Control': 'public, max-age=604800, immutable'
    }

    if (imageCache.has(imageUrl)) {
        const buffer = imageCache.get(imageUrl)

        if (undefined !== buffer) {
            const buf = buffer.getBuffer()
            headers['Content-Type'] = buffer.getContentType()
            headers['Content-Length'] = buf.byteLength.toString()
            return new Response(buf, {
                headers: headers
            })
        }
    }
    try {
        const url = new URL(imageUrl)
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Referer': url.origin
            }
        })
        const buffer = await res.arrayBuffer()
        const contentType = res.headers.get('Content-Type')
        if (isImage(contentType)) {
            // @ts-ignore
            imageCache.set(imageUrl, new ImageCache(buffer, contentType))
            // @ts-ignore
            headers['Content-Type'] = contentType
            headers['Content-Length'] = buffer.byteLength.toString()
            return new Response(buffer, {
                headers: headers
            })
        } else {
            throw new Error('Not an image')
        }
    } catch (e) {
        const transparentBuffer = await fetch(transparentImage).then(res => res.arrayBuffer())
        return new Response(transparentBuffer, {
            headers: {
                'Content-Type': 'image/png',
                'Content-Length': transparentBuffer.byteLength.toString()
            }
        })
    }
}

export async function GET(request: NextRequest) {
    const referer = request.headers.get('Referer')
    if (referer === null) {
        return Response.json({error: 'Illegal request'}, {status: 400})
    }
    const searchParams = request.nextUrl.searchParams
    if (searchParams.has('i')) {
        return camoImage(b64(searchParams.get('i')))
    }
    return Response.json({error: 'No params provided'}, {status: 400})
}
