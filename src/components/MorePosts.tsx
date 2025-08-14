'use client'

import type {PostsResponse} from '@/libs/notion'
import type {PostMeta} from '@/libs/types'
import axios from 'axios'
import {useSuspenseInfiniteQuery} from '@tanstack/react-query'
import {LoadMoreIndicator} from '@/components/LoadMoreIndicator'
import Loading from '@/components/Loading'
import PostItem from '@/components/post/PostItem'


export default function MorePosts() {
    const {data, isLoading, fetchNextPage, hasNextPage} = useSuspenseInfiniteQuery({
        queryKey: ['posts'],
        queryFn: async ({ pageParam }): Promise<PostsResponse> => {
            const res = await axios.get(`/api/posts?cursor=${pageParam}`)
            return res.data
        },
        getNextPageParam: lastPage => lastPage.nextCursor,
        initialPageParam: '',
        refetchOnMount: false
    })

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl">
            {data?.pages.map((page, i) => {
                return page.posts.map((post: PostMeta) => (
                    <PostItem key={post.id} post={post} />
                ))
            })}
            {hasNextPage && <LoadMoreIndicator onLoading={fetchNextPage} />}
        </div>
    )
}
