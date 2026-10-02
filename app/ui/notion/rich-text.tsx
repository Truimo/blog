import type { Handle, RemixNode } from 'remix/component'
import { unsafeHTML } from 'remix/component'
import type {
    RichTextItemResponse,
    RichTextItemResponseCommon,
    TextRichTextItemResponse,
    EquationRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
import katex from 'katex'
import { textAnnotationClasses, textColorStyle } from './colors.ts'

export function RichText(handle: Handle<{ rich_text: RichTextItemResponse[] }>) {
    return () => {
        const { rich_text } = handle.props
        return (
            <>
                {rich_text.map((item, idx) => {
                    if (item.type === 'text') {
                        return <Text key={idx} text={item} />
                    }
                    if (item.type === 'equation') {
                        return <InlineEquation key={idx} equation={item} />
                    }
                        return <span key={idx} class="text-red-600">不支持</span>
                })}
            </>
        )
    }
}

function Text(handle: Handle<{ text: TextRichTextItemResponse & RichTextItemResponseCommon }>) {
    return () => {
        const { text } = handle.props
        const cls = textAnnotationClasses(text.annotations)
        const mix = textColorStyle(text.annotations)

        if (text.text.link) {
            return (
                <a
                    class={cls ? `${cls} underline` : 'underline'}
                    mix={mix}
                    href={text.text.link.url}
                    rel="noreferrer"
                    target="_blank"
                >
                    {text.text.content}
                </a>
            )
        }

        return <span class={cls} mix={mix}>{text.text.content}</span>
    }
}

function InlineEquation(handle: Handle<{ equation: EquationRichTextItemResponse & RichTextItemResponseCommon }>) {
    return () => {
        const { equation } = handle.props
        let html: string
        try {
            html = katex.renderToString(equation.equation.expression, {
                throwOnError: false,
                displayMode: false,
                strict: 'ignore',
            })
        } catch {
            html = equation.equation.expression
        }
        return <span mix={textColorStyle(equation.annotations)} innerHTML={unsafeHTML(html)} />
    }
}
