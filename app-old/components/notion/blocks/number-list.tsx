import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import RichText from './rich-text'
import {InlineBlock} from './block'

export default function NumberList({block, children, order}: PropsWithChildren<{
    block: BlockObjectResponse,
    order: number
}>) {
    if ('numbered_list_item' !== block.type) {
        return null
    }
    const numbered_list_item = block.numbered_list_item
    return (
        <>
            <InlineBlock color={numbered_list_item.color}><span className="font-bold">&nbsp;{order}.&nbsp;</span><RichText rich_text={numbered_list_item.rich_text}/></InlineBlock>
            <div className="pl-[1em]">{children}</div>
        </>
    )
}
