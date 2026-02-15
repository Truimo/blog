import type {EquationRichTextItemResponse, RichTextItemResponseCommon} from '@notionhq/client/build/src/api-endpoints'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import {textStyled} from './styled'

export default function Equation({equation}: {
    equation: EquationRichTextItemResponse & RichTextItemResponseCommon
}) {
    const html = katex.renderToString(equation.equation.expression, {
        throwOnError: false,
        displayMode: false,
        strict: 'ignore',
    })
    return (
        <span className={textStyled(equation.annotations)}
              dangerouslySetInnerHTML={{__html: html}}
        ></span>
    )
}
