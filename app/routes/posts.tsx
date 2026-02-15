import type {Route} from './+types/posts'
import {getPage, getPost} from '~/libs/notion.server'
import {formatDate} from '~/libs/time'
import {blogDescription, blogTitle} from '~/site-info'
import Tags from '~/components/post/tags'
import Category from '~/components/post/category'
import {InlineBlock} from '~/components/notion/blocks/block'
import {PostCopyright} from '~/components/post/post-copyright'
import NotionRenderer from '~/components/notion/notion-renderer'

export async function loader({params}: Route.LoaderArgs) {
    const page = await getPost(params.slug)

    if (null === page) {
        throw new Response("Not Found", {status: 404})
    }

    const post = await getPage(page.id)
    const date: string = formatDate(page.date, 'YYYY 年 MM 月 DD 日')

    return {page, post, date}
}

export function meta({loaderData}: Route.MetaArgs) {
    const {page} = loaderData
    const title: string = `${page.title} - ${blogTitle}`
    const description: string = page.excerpt.length === 0 ? `本篇文章有关：${page.title}。` : page.excerpt

    return [
        {
            title: title,
        }, {
            name: 'description',
            content: description
        }
    ]
}

export default function Component({loaderData}: Route.ComponentProps) {
    const {page, post, date} = loaderData

    return (
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl">
            <InlineBlock>
                <Category category={page.category}/>
            </InlineBlock>
            <h1 className="py-1 text-3xl font-bold">{page.title}</h1>
            <InlineBlock className="leading-normal text-zinc-500">{page.excerpt}</InlineBlock>
            <InlineBlock className="space-x-2 text-zinc-500">
                <time dateTime={page.date}>{date}</time>
                <span className="font-bold">•</span>
                <Tags className="text-xs" tags={page.tags}/>
            </InlineBlock>
            <article>
                <div className="sr-only">
                    <h1 className="py-1 text-3xl font-bold">{page.title}</h1>
                </div>
                <NotionRenderer blocks={post}/>
            </article>
            <PostCopyright title={page.title} slug={page.slug}/>
        </div>
    )
}
