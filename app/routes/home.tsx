import type {Route} from './+types/home'
import type {PostsResponse} from '~/libs/notion'
import {getPosts} from '~/libs/notion'
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'
import {MorePosts} from '~/components/list/more-posts'

export async function loader() {
    const queryClient = new QueryClient()
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['posts'],
        queryFn: () => {
            return getPosts({
                pageSize: 10
            })
        },
        getNextPageParam: (lastPage: PostsResponse) => {
            return lastPage.nextCursor
        },
        initialPageParam: '',
    })
    return {
        dehydratedState: dehydrate(queryClient),
    }
}

export default function Home({loaderData}: Route.ComponentProps) {
    return (
        <HydrationBoundary state={loaderData.dehydratedState}>
            <MorePosts/>
        </HydrationBoundary>
    )
}
