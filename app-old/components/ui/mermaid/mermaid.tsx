import {lazy, Suspense} from 'react'
import {CodeHighLighterFallback} from '~/components/ui/code-highlighter'

interface MermaidProps {
    code: string
}

// Hoisted to module scope — must NOT be inside a component body
const MermaidRender = lazy(() =>
    import('./mermaid-render').then((mod) => ({default: mod.MermaidRender}))
)

export function Mermaid({code}: MermaidProps) {
    return (
        <Suspense fallback={<CodeHighLighterFallback lang="mermaid" text={code}/>}>
            <MermaidRender code={code}/>
        </Suspense>
    )
}
