import {use, useMemo} from 'react'
import {createHighlighterCoreSync, createJavaScriptRegexEngine} from 'shiki'
import {bundledLanguages} from 'shiki/langs'
import githubDark from 'shiki/themes/github-dark.mjs'
import githubLight from 'shiki/themes/github-light.mjs'
import {ShikiHighLighterWrapper} from './ShikiWrapper'
import {codeHighlighter as shiki} from './core'

const loadCodeHighlighter = () => {
    const core = createHighlighterCoreSync({
        engine: createJavaScriptRegexEngine(),
        themes: [githubDark, githubLight],
        langs: [],
    })

    return {
        highlighter: core,
        fn: (o: Parameters<typeof shiki>[1]) => shiki(core, o),
    }
}

const codeHighlighter = typeof window === 'undefined' ? undefined : loadCodeHighlighter()

async function loadShikiLanguage(language: string, languageModule: any) {
    const shiki = codeHighlighter?.highlighter
    if (!shiki) {
        return
    }
    if (!shiki.getLoadedLanguages().includes(language)) {
        await shiki.loadLanguage(await languageModule())
    }
}

export interface ShikiProps {
    lang: string | undefined
    content: string
    attrs?: string
}

export const ShikiHighLighter = (props: ShikiProps) => {
    const {lang: language, content: value, attrs} = props

    use(
        useMemo(async () => {
            const lang = language ?? 'text'

            if (lang in bundledLanguages) {
                return loadShikiLanguage(lang, bundledLanguages[lang as keyof typeof bundledLanguages])
            }
        }, [language]),
    )

    const highlightedHtml = useMemo(() => codeHighlighter?.fn?.({
        attrs: attrs || '',
        code: value,
        lang: language ? language.toLowerCase() : 'text',
    }), [attrs, language, value])

    return (
        <ShikiHighLighterWrapper language={language} renderedHTML={highlightedHtml}/>
    )
}
