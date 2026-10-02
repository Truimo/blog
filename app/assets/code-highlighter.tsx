import { clientEntry, css, ref, type Handle, type SerializableValue } from 'remix/component'

export interface CodeHighlighterProps {
    lang?: string
    text: string
    [key: string]: SerializableValue
}

const codeCardCss = css({
    position: 'relative',
    backgroundColor: 'rgba(120, 120, 128, 0.06)',
    borderRadius: '4px',
    padding: '1rem',
    overflow: 'hidden',
    '@media': {
        '(prefers-color-scheme: dark)': {
            backgroundColor: 'rgba(120, 120, 128, 0.12)',
        },
    },
    '& .shiki': {
        backgroundColor: 'transparent !important',
    },
    '& .shiki code': {
        fontSize: '14px',
        lineHeight: '1.6',
        fontFamily: 'var(--font-mono), serif',
    },
    '& .language-tip': {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: '0.75em',
        padding: '0.25em 0.75em',
        color: 'var(--color-ink-secondary)',
        userSelect: 'none',
    },
})

/**
 * Lazily highlights code with Shiki on the client. Renders a plain fallback
 * first so the page works without JavaScript or before hydration.
 */
export const CodeHighlighter = clientEntry<CodeHighlighterProps>(
    import.meta.url + '#CodeHighlighter',
    function CodeHighlighter(handle: Handle<CodeHighlighterProps>) {
        return () => {
            const { lang, text } = handle.props
            const language = (lang ?? 'text').toUpperCase()

            return (
                <div mix={codeCardCss}>
                    <div class="language-tip">
                        <span aria-hidden="true">{language}</span>
                    </div>
                    <div
                        class="overflow-auto"
                        style={{ scrollbarGutter: 'stable' }}
                        mix={ref((node, signal) => {
                            highlightCode(node, text, lang, signal)
                        })}
                    >
                        <pre class="shiki">
                            <code>{text}</code>
                        </pre>
                    </div>
                </div>
            )
        }
    },
)

/**
 * Highlights the code inside the wrapper element once it is in the DOM.
 * Replaces the fallback <pre> with Shiki's highlighted markup.
 */
async function highlightCode(node: Element, text: string, lang: string | undefined, signal: AbortSignal): Promise<void> {
    try {
        const { createHighlighterCoreSync, createJavaScriptRegexEngine } = await import('shiki')
        const { bundledLanguages } = await import('shiki/langs')
        const githubDark = (await import('shiki/themes/github-dark.mjs')).default
        const githubLight = (await import('shiki/themes/github-light.mjs')).default
        if (signal.aborted) return

        const highlighter = createHighlighterCoreSync({
            engine: createJavaScriptRegexEngine({ forgiving: true }),
            themes: [githubDark, githubLight],
            langs: [],
        })

        const language = lang && lang in bundledLanguages ? lang : 'text'
        if (!highlighter.getLoadedLanguages().includes(language)) {
            const loader = bundledLanguages[language as keyof typeof bundledLanguages]
            if (loader) await highlighter.loadLanguage(await loader())
        }
        if (signal.aborted) return

        const html = highlighter.codeToHtml(text, {
            lang: language,
            themes: { light: 'github-light', dark: 'github-dark' },
        })

        const target = node.querySelector('pre')
        if (target && !signal.aborted) {
            target.outerHTML = html
        }
    } catch {
        // Keep the plain fallback markup.
    }
}
