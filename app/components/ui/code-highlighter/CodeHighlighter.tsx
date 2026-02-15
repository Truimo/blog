import {lazy, Suspense} from 'react'
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
    const ShikiHighLighter = lazy(() =>
        import('./ShikiHighLighter').then((mod) => ({
            default: mod.ShikiHighlighter,
        })),
    )

    return (
        <Suspense fallback={<CodeHighLighterFallback lang={props.lang} text={props.text} />}>
            <ShikiHighLighter lang={props.lang} content={props.text} />
        </Suspense>
    )
}
