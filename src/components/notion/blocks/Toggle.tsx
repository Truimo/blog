import RichText from '@/components/notion/blocks/RichText'
import {Block} from '@/components/notion/blocks/Block'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'


export default function Toggle({ block, children }: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('toggle' !== block.type) {
        return null
    }
    const toggle = block.toggle
    return (
        <details>
            <summary><RichText rich_text={toggle.rich_text}/></summary>
            <Block>{children}</Block>
        </details>
    )
}
