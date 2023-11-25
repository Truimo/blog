import RichText from '@/components/notion/blocks/RichText'
import {InlineBlock} from '@/components/notion/blocks/Block'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

export default function ToDo({block}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('to_do' !== block.type) {
        return null
    }
    const to_do = block.to_do
    return (
        <InlineBlock color={to_do.color}>
            <label>
                <input type="checkbox" defaultChecked={to_do.checked}/>&nbsp;<RichText rich_text={to_do.rich_text}/>
            </label>
        </InlineBlock>
    )
}
