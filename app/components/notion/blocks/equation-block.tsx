import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import {useMemo} from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import {Block} from './block'

export default function EquationBlock({block}: {block: BlockObjectResponse}) {
    if (block.type !== 'equation') return null

    const {equation} = block
    const html = useMemo(() =>
        katex.renderToString(equation.expression, {
            throwOnError: false,
            displayMode: true,
            strict: 'ignore',
        }),
    [equation.expression])

    return (
        <Block>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </Block>
    )
}
