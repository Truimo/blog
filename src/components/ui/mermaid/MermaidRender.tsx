import type { PropsWithChildren } from 'react'
import { useId, useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import styles from './Mermaid.module.css'

interface MermaidProps extends PropsWithChildren {
    code: string
}

mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    look: 'handDrawn',
})

export function MermaidRender(props: MermaidProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            mermaid.run({
                nodes: [ref.current]
            })
        }
    }, [props.code])

    return (
        <div className={styles.mermaid} ref={ref}>{props.code}</div>
    )
}
