import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import {Block, InlineBlock} from './block'
import RichText from './rich-text'

export default function Quote({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('quote' !== block.type) {
        return null
    }
    const quote = block.quote

    return (
        <Block color={quote.color}>
            <blockquote className="pl-3 border-l-4 border-current">
                <InlineBlock><RichText rich_text={quote.rich_text}/></InlineBlock>
                {children}
            </blockquote>
        </Block>
    )
}
