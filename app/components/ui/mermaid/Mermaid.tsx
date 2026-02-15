import type {PropsWithChildren} from 'react'
import {lazy, Suspense} from 'react'
import {CodeHighLighterFallback} from '~/components/ui/code-highlighter'

interface MermaidProps extends PropsWithChildren {
    code: string
}

// mermaid.initialize({
//     startOnLoad: false
// })

export function Mermaid(props: MermaidProps) {
    const MermaidRender = lazy(() =>
        import('./MermaidRender').then((mod) => ({
            default: mod.MermaidRender,
        })),
    )

    return (
        <Suspense fallback={<CodeHighLighterFallback lang="mermaid" text={props.code}/>}>
            <MermaidRender code={props.code}/>
        </Suspense>
    )
}
