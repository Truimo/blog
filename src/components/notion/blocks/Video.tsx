import RichText from '@/components/notion/blocks/RichText'
import {Block, InlineBlock} from '@/components/notion/blocks/Block'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'


export default function Video({block}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('video' !== block.type) {
        return null
    }
    const video = block.video
    const url = video.type === 'external' ? video.external.url : video.file.url
    return (
        <Block>
            <div className="max-w-full w-fit mx-auto">
                <video src={url} controls></video>
                {video.caption.length > 0 && (
                    <InlineBlock className="text-neutral-500 text-sm">
                        <RichText rich_text={video.caption} />
                    </InlineBlock>
                )}
            </div>
        </Block>
    )
}
