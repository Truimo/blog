import RichText from '@/components/notion/blocks/RichText'
import {InlineBlock} from '@/components/notion/blocks/Block'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

export default function Paragraph({block}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('paragraph' !== block.type) {
        return null
    }
    const paragraph = block.paragraph
    return (
        <InlineBlock color={paragraph.color}>{<RichText rich_text={paragraph.rich_text}/>}</InlineBlock>
    )
}
