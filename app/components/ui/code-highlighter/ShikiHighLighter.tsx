import {use, useMemo} from 'react'
import {bundledLanguages} from 'shiki/langs'
import type {ShikiProps} from './Shiki'
import {ShikiHighLighter} from './Shiki'

const bundledLanguagesKeysSet: Set<string> = new Set(Object.keys(bundledLanguages))

export function ShikiHighlighter(props: ShikiProps) {
    const language = use(
        useMemo(async () => {
            if (!props.lang) {
                return 'text'
            }

            if (bundledLanguagesKeysSet.has(props.lang)) {
                return props.lang
            }

            return 'text'
        }, [props.lang]),
    )

    return (
        <ShikiHighLighter lang={language} content={props.content} attrs={props.attrs}/>
    )
}
