import {getPage, getPost} from '@/libs/notion'
import NotionRenderer from '@/components/notion/NotionRenderer'
import Category from '@/components/post/Category'
import {formatDate} from '@/libs/time'
import {InlineBlock} from '@/components/notion/blocks/Block'

export default async function Page({ params }: {
    params: { slug: string }
}) {
    const slug = params.slug
    const page = await getPost(slug)

    if (null === page) {
        return <p>Page not found</p>
    }

    const post = await getPage(page.id)

    return (
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl">
            <InlineBlock>
                <Category category={page.category}/>
                <span className="font-bold">&nbsp;&middot;&nbsp;</span>
                <time dateTime={page.date}>{formatDate(page.date, 'YYYY 年 MM 月 DD 日')}</time>
            </InlineBlock>
            <h1 className="py-1 text-3xl font-bold">{page.title}</h1>
            <InlineBlock className="leading-normal text-gray-600">{page.excerpt}</InlineBlock>
            <hr className="my-4"/>
            <NotionRenderer blocks={post}/>
        </div>
    )
}
