import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import {Block, InlineBlock} from './block'
import RichText from './rich-text'
import Icon from './icon'

export default function Callout({ block, children }: PropsWithChildren<{
    block: BlockObjectResponse;
}>) {
    if ('callout' !== block.type) {
        return null
    }
    const callout = block.callout
    return (
        <Block className="my-1 p-2" color={callout.color}>
            <InlineBlock>{callout.icon && (
                <>
                    <Icon icon={callout.icon}/>
                    <span>&nbsp;</span>
                </>
            )}<RichText rich_text={callout.rich_text}/></InlineBlock>
            {children}
        </Block>
    )
}
