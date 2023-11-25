import '@/styles/globals.css'
import {Inter} from 'next/font/google'
import {ReactNode} from 'react'
import {ReactQueryProvider} from '@/providers/react-query-provider'
import type {Metadata} from 'next'
import Root from '@/components/layout/Root'
import {blogName, blogTitle, blogDescription, blogKeywords} from '@/config'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    viewport: {
        width: 'device-width',
        initialScale: 1,
        minimumScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    title: {
        default: blogName,
        template: `%s - ${blogTitle}`
    },
    description: blogDescription,
    keywords: blogKeywords,
    verification: {
        google: 'GdFb_xYFw9Ait8bFcxGoIPoZwD1BfatxIpEXznZdpUE'
    }
}

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="zh-CN">
        <body className={`${inter.className} font-sans`}>
        <ReactQueryProvider>
            <Root>{children}</Root>
        </ReactQueryProvider>
        </body>
        </html>
    )
}
