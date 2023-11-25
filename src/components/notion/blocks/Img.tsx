import RichText from '@/components/notion/blocks/RichText'
import {Block, InlineBlock} from '@/components/notion/blocks/Block'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'


export default function Img({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('image' !== block.type) {
        return null
    }
    const img = block.image
    const url = img.type === 'external' ? img.external.url : img.file.url
    return <Block>
        <div className="max-w-full w-fit mx-auto">
            <img src={url} alt="" className="block max-w-full w-fit object-cover"/>
            {img.caption.length > 0 && (<InlineBlock className="text-neutral-500 text-sm">
                <RichText rich_text={img.caption}/>
            </InlineBlock>)}
        </div>
    </Block>
}


