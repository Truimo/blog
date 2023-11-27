import '@/styles/index.css'
import {Inter} from 'next/font/google'
import {ReactNode} from 'react'
import {ReactQueryProvider} from '@/providers/react-query-provider'
import type {Metadata, Viewport} from 'next'
import Root from '@/components/layout/Root'
import {blogName, blogTitle, blogDescription, blogKeywords} from '@/config'

const inter = Inter({subsets: ['latin']})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export const metadata: Metadata = {
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
        }, {
            rel: 'canonical',
            url: 'https://blog.truimo.com',
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
        <body className={`${inter.className} font-sans`}>
        <SayHi/>
        <ReactQueryProvider>
            <Root>{children}</Root>
        </ReactQueryProvider>
        </body>
        </html>
    )
}

function SayHi() {
    return (
        <script dangerouslySetInnerHTML={{
            __html: 'console.log("%c Truimo\'s Blog %c https://github.com/Truimo/blog ", "color: #fff; margin: 1em 0; padding: 5px 0; background: #0ea5e9;", "margin: 1em 0; padding: 5px 0; background: #efefef;");'
        }}></script>
    )
}
