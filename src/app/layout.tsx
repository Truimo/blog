import '@/styles/globals.css'
import {Inter} from 'next/font/google'
import Head from 'next/head'
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
    icons: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '500x500',
            url: 'https://assets.truimo.com/avatars/min.png',
        }
    ],
    verification: {
        google: 'GdFb_xYFw9Ait8bFcxGoIPoZwD1BfatxIpEXznZdpUE'
    }
}

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="zh-CN">
        <Head>
            <link
                rel="canonical"
                href="https://blog.truimo.com"
                key="canonical"
            />
        </Head>
        <body className={`${inter.className} font-sans`}>
        <ReactQueryProvider>
            <Root>{children}</Root>
        </ReactQueryProvider>
        </body>
        </html>
    )
}
