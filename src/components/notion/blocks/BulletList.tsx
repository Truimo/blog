import RichText from '@/components/notion/blocks/RichText'
import {InlineBlock} from '@/components/notion/blocks/Block'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

export default function BulletList({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('bulleted_list_item' !== block.type) {
        return null
    }
    const bulleted_list_item = block.bulleted_list_item
    return (
        <>
            <InlineBlock color={bulleted_list_item.color}><span className=" font-bold">&nbsp;&bull;&nbsp;</span><RichText rich_text={bulleted_list_item.rich_text}/></InlineBlock>
            <div className="pl-[1em]">{children}</div>
        </>
    )
}
