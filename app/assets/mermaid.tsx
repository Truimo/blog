import { clientEntry, css, ref, type Handle, type SerializableValue } from 'remix/component'

export interface MermaidProps {
    code: string
    [key: string]: SerializableValue
}

const mermaidCss = css({
    backgroundImage: 'radial-gradient(circle, #e4e4e48c 2px, #0000 0)',
    backgroundSize: '30px 30px',
    '@media (prefers-color-scheme: dark)': {
        backgroundImage: 'radial-gradient(circle, #46464646 2px, #0000 0)',
    },
})

/**
 * Renders a Mermaid diagram on the client. The raw code is rendered first as a
 * fallback and replaced with the rendered SVG once mermaid loads.
 */
export const Mermaid = clientEntry<MermaidProps>(
    import.meta.url + '#Mermaid',
    function Mermaid(handle: Handle<MermaidProps>) {
        return () => {
            const { code } = handle.props

            return (
                <div
                    mix={[
                        mermaidCss,
                        ref(async (node, signal) => {
                            try {
                                // 深导入 mermaid 的全量 ESM bundle：它把 fastdom 等仅支持 CJS 的
                                // 依赖全部内联，可以被 asset server 直接编译。
                                // （裸导入 'mermaid' 指向的 mermaid.core.mjs 会拉入 CJS 依赖。）
                                const mermaid = (await import('mermaid/dist/mermaid.esm.mjs')).default
                                const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
                                mermaid.initialize({
                                    startOnLoad: false,
                                    theme,
                                    look: 'handDrawn',
                                })
                                const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).slice(2)}`, code)
                                if (signal.aborted) return
                                node.innerHTML = svg
                            } catch {
                                if (!signal.aborted) node.textContent = code
                            }
                        }),
                    ]}
                >
                    {code}
                </div>
            )
        }
    },
)
