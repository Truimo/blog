import Link from 'next/link'
import {formatDate} from '@/libs/time'
import Category from '@/components/post/Category'
import type {PostMeta} from '@/libs/types'

export default function PostItem({post}: {
    post: PostMeta
}) {
    return (
        <article className="my-8">
            <Link href={`/posts/${post.slug}`}>
                <p className="text-sm leading-normal">
                    <Category category={post.category}/>
                    <span className="font-bold">&nbsp;·&nbsp;</span>
                    <time dateTime={post.date}>{formatDate(post.date, 'YYYY 年 MM 月 DD 日')}</time>
                </p>
                <h2 className="text-xl font-medium my-2">{post.title}</h2>
                <p className="leading-loose text-gray-800/90">{post.excerpt}</p>
            </Link>
        </article>
    )
}
