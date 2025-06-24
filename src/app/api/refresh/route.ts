// import type {NextRequest} from 'next/server'
// import { revalidateTag } from 'next/cache'

export async function GET() {

    // revalidateTag('notion')

    return new Response('OK', {
        status: 200,
    })
}
