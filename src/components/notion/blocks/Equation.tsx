import type {EquationRichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'
import 'katex/dist/katex.min.css'
import katex from 'katex'

export default function Equation({equation}: {
    equation: EquationRichTextItemResponse
}) {
    const html = katex.renderToString(equation.equation.expression, {
        throwOnError: false,
        displayMode: false,
        strict: 'ignore',
    })
    return (
        <span dangerouslySetInnerHTML={{__html: html}}></span>
    )
}
