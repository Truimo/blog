import type {Config} from '@react-router/dev/config'
import {vercelPreset} from '@vercel/react-router/vite'
import { getPosts } from './app/libs/notion.server'

export default {
    ssr: true,
    async prerender({getStaticPaths}) {
        const staticPaths = getStaticPaths().filter((it) => {
            return !it.startsWith('/api/')
        })

        const response = await getPosts()
        const posts = response.posts.map((post) => {
            return `/posts/${post.slug}`
        })

        return [
            ...staticPaths,
            ...posts,
        ]
    },
    presets: [
        vercelPreset()
    ],
} satisfies Config
