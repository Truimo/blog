import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import RichText from './rich-text'
import {Block} from './block'

export default function Img({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('image' !== block.type) {
        return null
    }

    const img = block.image
    const url = img.type === 'external' ? img.external.url : `/api/notion/image/${block.id}`
    const alt = img.caption.map((block) => block.plain_text).join('')

    return <Block>
        <figure className="max-w-full w-fit mx-auto">
            <img src={url} alt={alt} loading="lazy" className="block max-w-full w-fit object-cover"/>
            {img.caption.length > 0 && (<figcaption className="py-1 break-words text-neutral-500 text-sm">
                <RichText rich_text={img.caption}/>
            </figcaption>)}
        </figure>
    </Block>
}
