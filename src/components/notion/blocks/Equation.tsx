import type {EquationRichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'
import 'katex/dist/katex.min.css'
import katex from 'katex'
import {textStyeld} from '@/components/notion/styled'

export default function Equation({equation}: {
    equation: EquationRichTextItemResponse
}) {
    const html = katex.renderToString(equation.equation.expression, {
        throwOnError: false,
        displayMode: false,
        strict: 'ignore',
    })
    return (
        <span className={textStyeld(equation.annotations)}
              dangerouslySetInnerHTML={{__html: html}}
        ></span>
    )
}
