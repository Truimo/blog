import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import {Block, InlineBlock} from './block'
import RichText from './rich-text'
import {CodeHighLighter} from '~/components/ui/code-highlighter/CodeHighlighter'
import {Mermaid} from '~/components/ui/mermaid'

export default function Code({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('code' !== block.type) {
        return null
    }
    const code = block.code
    const text = code.rich_text.map((text) => text.plain_text).join('')

    if ('mermaid' === code.language) {
        return (
            <Block>
                <Mermaid code={text}/>
            </Block>
        )
    }

    return (<Block>
        <CodeHighLighter lang={code.language} text={text}/>
        {code.caption.length > 0 && (<InlineBlock className="text-neutral-500 text-sm">
            <RichText rich_text={code.caption}/>
        </InlineBlock>)}
    </Block>)
}
