import type {RichTextItemResponseCommon, TextRichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'
import {SquareArrowOutUpRight} from 'lucide-react'
import {clsxm} from '~/libs/helper'
import {textStyled} from './styled'

export default function Text({text}: {
    text: TextRichTextItemResponse & RichTextItemResponseCommon
}) {
    if (text.text.link) {
        return (
            <a className={clsxm('underline', textStyled(text.annotations))} href={text.text.link.url}
               rel="noreferrer" target="_blank">
                <span>{text.text.content}</span>
                <SquareArrowOutUpRight/>
            </a>
        )
    }

    return (
        <span className={textStyled(text.annotations)}>{text.text.content}</span>
    )
}
