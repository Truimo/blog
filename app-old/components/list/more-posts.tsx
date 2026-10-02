import type {PostMeta} from '~/types'
import type {PostsResponse} from '~/types'
import axios from 'axios'
import {useSuspenseInfiniteQuery} from '@tanstack/react-query'
import {Loading} from '~/components/common/loading'
import PostItem from '~/components/post/post-item'
import {LoadMoreIndicator} from './load-more-indicator'

export const MorePosts = () => {
    const {data, isLoading, fetchNextPage, hasNextPage} = useSuspenseInfiniteQuery({
        queryKey: ['posts'],
        queryFn: async ({pageParam}): Promise<PostsResponse> => {
            const res = await axios.get(`/api/posts?cursor=${pageParam}`)
            return res.data
        },
        getNextPageParam: lastPage => lastPage.nextCursor,
        initialPageParam: '',
        refetchOnMount: false
    })

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl">
            {data?.pages.map((page, i) => {
                return page.posts.map((post: PostMeta) => (
                    <PostItem key={post.id} post={post}/>
                ))
            })}
            {hasNextPage && <LoadMoreIndicator onLoading={fetchNextPage}/>}
        </div>
    )
}
