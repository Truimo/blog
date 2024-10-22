import type {Metadata} from 'next'
import type {PropsWithChildren} from 'react'
import {getPost} from '@/libs/notion'

type Params = Promise<{ slug: string }>

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const { slug } = await params
    const page = await getPost(slug)

    if (null === page) {
        return {}
    }

    return {
        title: page.title,
        description: page.excerpt,
        keywords: page.tags.map(tag => tag.name),
        category: page.category.name,
        icons: {
            icon: {
                rel: 'icon',
                type: 'image/png',
                sizes: '500x500',
                url: 'https://assets.truimo.com/avatars/min.png'
            },
            other: {
                rel: 'canonical',
                url: `https://blog.truimo.com/posts/${slug}`
            }
        }
    }
}

export default function Layout({children}: PropsWithChildren) {
    return children
}
