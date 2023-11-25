import {getAnnotationsClass} from '@/libs/notion'
import type {TextRichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'

export default function Text({text}: {
    text: TextRichTextItemResponse
}) {
    if (text.text.link) {
        return (
            <a className={getAnnotationsClass(text.annotations)} href={text.text.link.url}
               target="_blank">{text.text.content}</a>
        )
    }

    return (
        <span className={getAnnotationsClass(text.annotations)}>{text.text.content}</span>
    )
}
