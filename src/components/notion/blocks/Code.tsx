import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import {Block, InlineBlock} from '@/components/notion/blocks/Block'
import RichText from '@/components/notion/blocks/RichText'
import {CodeHighLighter} from '@/components/ui/code-highlighter/CodeHighlighter'
// import styles from '../styles/Code.module.css'

export default function Code({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('code' !== block.type) {
        return null
    }
    const code = block.code
    const text = code.rich_text.map((text) => text.plain_text).join('')

    return <Block>
        <CodeHighLighter lang={code.language} text={text} />
        {code.caption.length > 0 && (<InlineBlock className="text-neutral-500 text-sm">
            <RichText rich_text={code.caption}/>
        </InlineBlock>)}
    </Block>
}
