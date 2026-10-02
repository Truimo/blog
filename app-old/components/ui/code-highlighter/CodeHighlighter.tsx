import {lazy, Suspense} from 'react'
import {ShikiHighLighterWrapper} from './ShikiWrapper'

interface CodeHighLighterProps {
    lang?: string
    text: string
}

// Hoisted to module scope — must NOT be inside a component body
const ShikiHighLighter = lazy(() =>
    import('./ShikiHighLighter').then((mod) => ({default: mod.ShikiHighlighter}))
)

export function CodeHighLighterFallback({lang, text}: CodeHighLighterProps) {
    return (
        <ShikiHighLighterWrapper language={lang}>
            <pre className="shiki">
                <code>{text}</code>
            </pre>
        </ShikiHighLighterWrapper>
    )
}

export function CodeHighLighter({lang, text}: CodeHighLighterProps) {
    return (
        <Suspense fallback={<CodeHighLighterFallback lang={lang} text={text}/>}>
            <ShikiHighLighter lang={lang} content={text}/>
        </Suspense>
    )
}
