'use client'

import dynamic from 'next/dynamic'
import {ErrorBoundary} from 'react-error-boundary'
import {ShikiHighLighterWrapper} from './ShikiWrapper'

interface CodeHighLighterProps {
    lang?: string
    text: string
}

function CodeHighLighterFallback(props: CodeHighLighterProps) {
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

    // TODO in safari. SyntaxError: Invalid regular expression: invalid operation in class set
    return (
        <ErrorBoundary fallback={<CodeHighLighterFallback lang={props.lang} text={props.text} />}>
            <ShikiHighLighter lang={props.lang} content={props.text} />
        </ErrorBoundary>
    )
}
