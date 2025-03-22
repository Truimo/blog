import Link from 'next/link'
import {formatDate} from '@/libs/time'
import Category from '@/components/post/Category'
import type {PostMeta} from '@/libs/types'

export default function PostItem({post}: {
    post: PostMeta
}) {
    const data: string = formatDate(post.date, 'YYYY 年 MM 月 DD 日');
    return (
        <article className="my-8">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                    <p className="text-sm leading-normal">
                        <time dateTime={post.date}>{data}</time>
                    </p>
                </div>
                <div>
                    <p className="text-sm leading-normal">
                        <Category category={post.category} />
                    </p>
                </div>
            </div>
            <h2 className="text-xl font-medium my-2">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="leading-loose text-zinc-500">{post.excerpt}</p>
        </article>
    )
}
