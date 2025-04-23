'use client'

import dynamic from 'next/dynamic'
import {ShikiHighLighterWrapper} from './ShikiWrapper'

interface CodeHighLighterProps {
    lang?: string
    text: string
}

export function CodeHighLighterFallback(props: CodeHighLighterProps) {
    return (
        <ShikiHighLighterWrapper language={props.lang}>
            <pre className="shiki">
                <code>{props.text}</code>
            </pre>
        </ShikiHighLighterWrapper>
    )
}

export function CodeHighLighter(props: CodeHighLighterProps) {
    const ShikiHighLighter = dynamic(() =>
            import('@/components/ui/code-highlighter/ShikiHighLighter').then((mod) => ({
                default: mod.ShikiHighlighter,
            })), {
            loading: () => (
                <CodeHighLighterFallback lang={props.lang} text={props.text} />
            ),
            ssr: false,
        }
    )

    return (
        <ShikiHighLighter lang={props.lang} content={props.text} />
    )
}
