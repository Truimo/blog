import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import {getPost} from '@/libs/notion'

interface PageParams {
    slug: string
}

export const generateMetadata = async ({params}: { params: PageParams }): Promise<Metadata> => {
    const slug = params.slug
    const page = await getPost(slug)

    if (null === page) {
        return {}
    }

    return {
        title: page.title,
        description: page.excerpt,
    }
}

export default function Layout({children}: {
    children: ReactNode
}) {
    return children
}
