import type {CodeToHastOptions, HighlighterCore} from 'shiki/types.mjs'
import type {BundledLanguage} from 'shiki/langs'
import type {BundledTheme} from 'shiki/themes'
import {
    transformerMetaHighlight,
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
} from '@shikijs/transformers'

export interface HighlighterOptions {
    lang: string
    code: string
    attrs: string
}

export function codeHighlighter(highlighter: HighlighterCore, {
    lang, attrs, code
}: HighlighterOptions) {
    const codeOptions: CodeToHastOptions<BundledLanguage, BundledTheme> = {
        lang,
        meta: {
            __raw: attrs,
        },
        themes: {
            light: 'github-light',
            dark: 'github-dark',
        },
    }

    return highlighter.codeToHtml(code, {
        ...codeOptions,
        transformers: [
            ...(codeOptions.transformers || []),
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationWordHighlight(),
            transformerMetaHighlight(),
        ],
    })
}
