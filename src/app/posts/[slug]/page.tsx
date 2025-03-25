import { notFound } from 'next/navigation'
import NotionRenderer from '@/components/notion/NotionRenderer'
import Category from '@/components/post/Category'
import Tags from '@/components/post/Tags'
import {InlineBlock} from '@/components/notion/blocks/Block'
import {getPage, getPost, getPosts} from '@/libs/notion'
import {formatDate} from '@/libs/time'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
    const response = await getPosts()
    return response.posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function Page(props: {
    params: Params
}) {
    const params = await props.params
    const page = await getPost(params.slug)

    if (null === page) {
        return notFound()
    }

    const post = await getPage(page.id),
        date: string = formatDate(page.date, 'YYYY 年 MM 月 DD 日')

    return (
        <article className="mx-auto max-w-3xl 2xl:max-w-4xl">
            <InlineBlock>
                <Category category={page.category} />
            </InlineBlock>
            <h1 className="py-1 text-3xl font-bold">{page.title}</h1>
            <InlineBlock className="leading-normal text-zinc-500">{page.excerpt}</InlineBlock>
            <InlineBlock className="space-x-2 text-zinc-500">
                <time dateTime={page.date}>{date}</time>
                <span className="font-bold">•</span>
                <Tags className="text-xs" tags={page.tags} />
            </InlineBlock>
            <NotionRenderer blocks={post}/>
        </article>
    )
}
