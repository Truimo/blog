import type {EquationRichTextItemResponse, RichTextItemResponseCommon} from '@notionhq/client/build/src/api-endpoints'
import {useMemo} from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import {textStyled} from './styled'

export default function Equation({equation}: {
    equation: EquationRichTextItemResponse & RichTextItemResponseCommon
}) {
    const html = useMemo(() =>
        katex.renderToString(equation.equation.expression, {
            throwOnError: false,
            displayMode: false,
            strict: 'ignore',
        }),
    [equation.equation.expression])

    return (
        <span className={textStyled(equation.annotations)}
              dangerouslySetInnerHTML={{__html: html}}
        />
    )
}
