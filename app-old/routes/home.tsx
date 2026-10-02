import type {Route} from './+types/home'
import type {PostsResponse} from '~/types'
import {getPosts} from '~/libs/notion.server'
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'
import {MorePosts} from '~/components/list/more-posts'
import {blogLink} from '~/site-info'

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
            <link rel="canonical" href={blogLink}/>
            <MorePosts/>
        </HydrationBoundary>
    )
}
