import type {TextRichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'
import {SquareArrowOutUpRight} from 'lucide-react'
import {clsxm} from '@/libs/helper'
import {textStyeld} from '@/components/notion/styled'

export default function Text({text}: {
    text: TextRichTextItemResponse
}) {
    if (text.text.link) {
        return (
            <a className={clsxm('underline', textStyeld(text.annotations))} href={text.text.link.url}
               rel="noreferrer" target="_blank">
                <span>{text.text.content}</span>
                <SquareArrowOutUpRight />
            </a>
        )
    }

    return (
        <span className={textStyeld(text.annotations)}>{text.text.content}</span>
    )
}
