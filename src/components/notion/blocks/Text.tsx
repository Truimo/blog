import {clsxm} from '@/libs/helper'
import {getAnnotationsClass} from '@/libs/notion'
import type {TextRichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'

export default function Text({text}: {
    text: TextRichTextItemResponse
}) {
    if (text.text.link) {
        return (
            <a className={clsxm('underline', getAnnotationsClass(text.annotations))} href={text.text.link.url}
               rel="noreferrer" target="_blank">{text.text.content}<i className="icon-[mingcute--external-link-line] translate-y-[2px]"></i></a>
        )
    }

    return (
        <span className={getAnnotationsClass(text.annotations)}>{text.text.content}</span>
    )
}
