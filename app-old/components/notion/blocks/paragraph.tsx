import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import RichText from './rich-text'
import {InlineBlock} from './block'

export default function Paragraph({block}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('paragraph' !== block.type) {
        return null
    }
    const paragraph = block.paragraph
    return (
        <InlineBlock color={paragraph.color}>
            <RichText rich_text={paragraph.rich_text} />
        </InlineBlock>
    )
}
