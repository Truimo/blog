'use client'

import React, {useInsertionEffect, useRef} from 'react'
import {Block} from '@/components/notion/blocks/Block'
import {loadStyleSheet, loadScript} from '@/libs/load-script'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

import styles from '../styles/Code.module.css'

declare global {
    interface Window {
        Prism: any
    }
}

export default function Code({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('code' !== block.type) {
        return null
    }
    const code = block.code
    const text = code.rich_text.map((text) => text.plain_text).join('')

    const prevThemeCSS = useRef<ReturnType<typeof loadStyleSheet>>()
    const ref = useRef<HTMLElement>(null)

    useInsertionEffect(() => {
        const css = loadStyleSheet(
            'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism-themes/1.9.0/prism-one-light.css',
        )
        if (prevThemeCSS.current) {
            const $prev = prevThemeCSS.current
            css.$link.onload = () => {
                $prev.remove()
            }
        }
        prevThemeCSS.current = css

        loadStyleSheet(
            'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/line-numbers/prism-line-numbers.min.css',
        )

        Promise.all([
            loadScript(
                'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/components/prism-core.min.js',
            ),
        ]).then(() =>
            Promise.all([
                loadScript(
                    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js',
                ),
                loadScript(
                    'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/line-numbers/prism-line-numbers.min.js',
                ),
            ]),
        ).then(() => {
            if (ref.current) {
                requestAnimationFrame(() => {
                    window.Prism?.highlightElement(ref.current)
                    requestAnimationFrame(() => {
                        window.Prism?.highlightElement(ref.current)
                    })
                })
            } else {
                requestAnimationFrame(() => {
                    window.Prism?.highlightAll()
                    // highlightAll twice
                    requestAnimationFrame(() => {
                        window.Prism?.highlightAll()
                    })
                })
            }
        })
    }, [])

    return <Block className={styles['code-wrap']}>
        <span aria-hidden={true} className={styles['language-tip']}>{code.language.toUpperCase()}</span>
        <pre className="line-numbers">
            <code ref={ref} className={`language-${code.language ?? 'markup'}`}>{text}</code>
        </pre>
    </Block>
}
