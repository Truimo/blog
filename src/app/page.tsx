import type {PostsResponse} from '@/libs/notion'
import {QueryClient, HydrationBoundary, dehydrate} from '@tanstack/react-query'
import {getPosts} from '@/libs/notion'
import MorePosts from '@/components/MorePosts'

export default async function Page() {
    const queryClient = new QueryClient()
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts({
            pageSize: 10
        }),
        getNextPageParam: (lastPage: PostsResponse) => lastPage.nextCursor,
        initialPageParam: '',
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MorePosts />
        </HydrationBoundary>
    )
}
