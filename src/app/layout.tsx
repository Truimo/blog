import '@/styles/globals.css'
import {Inter} from 'next/font/google'
import {ReactNode} from 'react'
import type {Metadata} from 'next'

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
        default: '浅小沫的博客',
        template: `%s - 浅小沫的博客`
    },
    description: '浅小沫的博客',
    keywords: ['浅小沫的博客', '浅小沫'],
}

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="zh-CN">
        <body className={inter.className}>{children}</body>
        </html>
    )
}
