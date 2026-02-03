import type { Metadata, Viewport } from 'next'
import process from 'node:process'
import { ReactNode } from 'react'
import { ReactQueryProvider } from '@/providers/react-query-provider'
import { Root } from '@/components/layout/Root'
import { blogName, blogTitle, blogDescription, blogKeywords } from '@/config'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import { NotionGlobalStyles } from '@/components/notion/styled/styles'

import '@/styles/index.css'

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

export default function RootLayout({ children }: {
    children: ReactNode
}) {
    return (
        <html lang="zh-CN">
            <body>
                <SayHi />
                <ReactQueryProvider>
                    <StyledComponentsRegistry>
                        <NotionGlobalStyles />
                        <Root>{children}</Root>
                    </StyledComponentsRegistry>
                </ReactQueryProvider>
                <Analytics />
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

function Analytics() {
    if (process.env.VERCEL_ENV === 'production') {
        return (
            <script defer src="/_vercel/insights/script.js"></script>
        )
    }
}
