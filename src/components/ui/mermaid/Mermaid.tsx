'use client'

import type { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { lazy, Suspense } from 'react'
import { CodeHighLighterFallback } from '@/components/ui/code-highlighter/CodeHighlighter'
import {MermaidRender} from "@/components/ui/mermaid/MermaidRender";

interface MermaidProps extends PropsWithChildren {
    code: string
}

// mermaid.initialize({
//     startOnLoad: false
// })

export function Mermaid(props: MermaidProps) {
    const MermaidRender = dynamic(() =>
        import('@/components/ui/mermaid/MermaidRender').then((mod) => ({
            default: mod.MermaidRender,
        })), {
            loading: () => (
                <CodeHighLighterFallback lang="mermaid" text={props.code} />
            ),
            ssr: false,
        }
    )

    // const MermaidRender = lazy(() =>
    //     import('@/components/ui/mermaid/MermaidRender').then((mod) => ({
    //         default: mod.MermaidRender,
    //     })),
    // )

    return (
        <MermaidRender code={props.code} />
    )
}
