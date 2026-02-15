import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import katex from 'katex'
import {Block, InlineBlock} from './block'

import 'katex/dist/katex.min.css'

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
