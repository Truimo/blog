import {getPosts} from '@/libs/notion'
import MorePosts from '@/components/MorePosts'
import PostItem from '@/components/post/PostItem'

export default async function Page() {
    const response = await getPosts()

    return (
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl">
            {response.posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
            <MorePosts nextCursor={response.nextCursor} />
        </div>
    )
}
