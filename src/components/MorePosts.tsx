'use client';

import axios from 'axios'
import {useInfiniteQuery} from '@tanstack/react-query'
import {LoadMoreIndicator} from '@/components/LoadMoreIndicator'
import Loading from '@/components/Loading'
import PostItem from '@/components/post/PostItem'
import type {PostsResponse} from '@/libs/notion'
import type {PostMeta} from '@/libs/types'

export default function MorePosts({nextCursor}: {
    nextCursor: string | null
}) {
    const {data, isLoading, fetchNextPage, status} = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: async ({pageParam}): Promise<PostsResponse> => {
            const res = await axios.get(`/api/posts?cursor=${pageParam}`)
            return res.data
        },
        getNextPageParam: lastPage => lastPage.nextCursor,
        initialPageParam: nextCursor,
        refetchOnMount: true
    })

    const hasNext = data?.pages[data.pages.length - 1].nextCursor !== null

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {data?.pages.map((page, i) => {
                return page.posts.map((post: PostMeta) => (
                    <PostItem key={post.id} post={post} />
                ))
            })}
            {hasNext && <LoadMoreIndicator onLoading={() => fetchNextPage()} />}
        </>
    )
}
