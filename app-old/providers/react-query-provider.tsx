import type {PropsWithChildren} from 'react'
import {defaultShouldDehydrateQuery, isServer, QueryClient, QueryClientProvider} from '@tanstack/react-query'

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1e3,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
                shouldRedactErrors: () => import.meta.env.PROD,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    }
    if (browserQueryClient === undefined) {
        browserQueryClient = makeQueryClient()
    }
    return browserQueryClient
}

export const ReactQueryProvider = ({children}: PropsWithChildren) => {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}
