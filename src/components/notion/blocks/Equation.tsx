import 'katex/dist/katex.min.css'
import katex from 'katex'
import {getAnnotationsClass} from '@/libs/notion'
import type {EquationRichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'

export default function Equation({equation}: {
    equation: EquationRichTextItemResponse
}) {
    const html = katex.renderToString(equation.equation.expression, {
        throwOnError: false,
        displayMode: false
    })
    return (
        <span className={getAnnotationsClass(equation.annotations)}
              dangerouslySetInnerHTML={{__html: html}}
        ></span>
    )
}
