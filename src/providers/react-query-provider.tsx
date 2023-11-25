'use client'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {type PropsWithChildren} from 'react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
        },
    },
})

export const ReactQueryProvider = ({children}: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
