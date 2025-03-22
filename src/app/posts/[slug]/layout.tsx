import type {Metadata} from 'next'
import type {PropsWithChildren} from 'react'
import {getPost} from '@/libs/notion'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: {
    params: Params
}): Promise<Metadata> {
    const params = await props.params
    const page = await getPost(params.slug)

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
                url: `https://blog.truimo.com/posts/${params.slug}`
            }
        }
    }
}

export default function Layout({children}: PropsWithChildren) {
    return children
}
