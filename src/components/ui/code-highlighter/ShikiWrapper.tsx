import type {PropsWithChildren} from 'react'
import {useMemo} from 'react'
import styles from './ShikiWrapper.module.css'

type ShikiWrapperProps = PropsWithChildren<{
    language?: string,
    renderedHTML?: string
}>

export const ShikiHighLighterWrapper = (props: ShikiWrapperProps) => {
    const codeHtml = useMemo(() => {
        return props.renderedHTML
            ? {
                __html: props.renderedHTML,
            } : undefined
    }, [props.renderedHTML])

    const language = (props.language ?? 'text').toUpperCase()

    return (
        <div className={styles['code-card']}>
            <div className={styles['language-tip']}>
                <span aria-hidden={true} className="text-zinc-500">{language}</span>
            </div>
            <div className="overflow-scroll" dangerouslySetInnerHTML={codeHtml}>{props.children}</div>
        </div>
    )
}
