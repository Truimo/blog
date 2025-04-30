import type { PostMeta } from '@/libs/types'
import Link from 'next/link'
import { Time } from './Time'
import Category from './Category'
import Tags from './Tags'

export default function PostItem({post}: {
    post: PostMeta
}) {
    return (
        <article className="my-8">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                    <p className="text-sm leading-normal text-zinc-500">                        
                        <Time datetime={post.date} />
                        <span className="px-2">•</span>
                        <Category category={post.category} />
                    </p>
                </div>
                <div>
                    <p className="text-sm leading-normal space-x-2">
                        <Tags tags={post.tags} />
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
