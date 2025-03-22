import {getPage, getPost, getPosts} from '@/libs/notion'
import NotionRenderer from '@/components/notion/NotionRenderer'
import Category from '@/components/post/Category'
import {formatDate} from '@/libs/time'
import {InlineBlock} from '@/components/notion/blocks/Block'

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
        return <p>Page not found</p>
    }

    const post = await getPage(page.id),
        date: string = formatDate(page.date, 'YYYY 年 MM 月 DD 日')

    return (
        <article className="mx-auto max-w-3xl 2xl:max-w-4xl">

            <h1 className="py-1 text-3xl font-bold">{page.title}</h1>
            <InlineBlock className="leading-normal text-zinc-500">{page.excerpt}</InlineBlock>
            <InlineBlock className="space-x-2 text-zinc-500">
                <time dateTime={page.date}>{date}</time>
                <span className="font-bold">•</span>
                <Category category={page.category} />
            </InlineBlock>
            <NotionRenderer blocks={post}/>
        </article>
    )
}
