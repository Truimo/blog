import 'katex/dist/katex.min.css'
import katex from 'katex'
import {Block, InlineBlock} from '@/components/notion/blocks/Block'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

export default function EquationBlock({block}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('equation' !== block.type) {
        return null
    }
    const equation = block.equation
    const html = katex.renderToString(equation.expression, {
        throwOnError: false,
        displayMode: true,
        strict: 'ignore',
    })
    return (
        <Block>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        </Block>
    )
}
