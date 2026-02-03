'use client'

import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import axios from 'axios'
import clsx from 'clsx'
import {useQuery} from '@tanstack/react-query'
import {SquareArrowOutUpRight} from 'lucide-react'
import {Block, InlineBlock} from '@/components/notion/blocks/Block'
import RichText from '@/components/notion/blocks/RichText'
// import {CamoImage} from '@/components/common/Image'
import {
    BookmarkDescription,
    BookmarkImageFrame,
    BookmarkImages,
    BookmarkImg,
    BookmarkInfoBox,
    BookmarkIcon,
    BookmarkLink,
    BookmarkLinkText,
    BookmarkTitle
} from './styled/bookmark'

export default function Bookmark({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('bookmark' !== block.type) {
        return null
    }
    const bookmark = block.bookmark

    return (
        <Block>
            <BookmarkInner id={block.id} url={bookmark.url} />
            {bookmark.caption.length > 0 && (
                <InlineBlock className="text-neutral-500 text-sm">
                    <RichText rich_text={bookmark.caption}/>
                </InlineBlock>
            )}
        </Block>
    )
}

function getHost(url: string): string {
    const match = url.match(/^(https?:\/\/)?([\w.-]+)/)
    return match ? match[2] : ''
}

interface BookmarkInnerProps {
    id: string
    url: string
}

const BookmarkInner = (props: BookmarkInnerProps) => {
    const {data, isSuccess} = useQuery({
        queryKey: ['bookmark', props.id],
        queryFn: async () => {
            const res = await axios.post('/api/bookmark', {
                url: props.url
            }, { timeout: 3e3 })
            return res.data
        }
    })

    return (
        <BookmarkLink href={props.url} role="link" target="_blank" rel="noopener noreferrer">
            <BookmarkInfo url={props.url} isSuccess={isSuccess} data={data} />
            <BookmarkImage isSuccess={isSuccess} data={data} />
        </BookmarkLink>
    )
}

function BookmarkInfo(props: { url: string, isSuccess: boolean, data: any }) {
    if (props.isSuccess) {
        const data = props.data
        const title = data.title ? data.title : getHost(props.url),
            description = data.description ? data.description : data.open_graph?.description,
            favicon = data.favicon
        return (
            <BookmarkInfoBox>
                <BookmarkTitle>{title}</BookmarkTitle>
                <BookmarkDescription>{description}</BookmarkDescription>
                <BookmarkLinkText>
                    {favicon && (<BookmarkIcon src={favicon} alt="icon" />)}
                    <span>{props.url}</span>
                    <SquareArrowOutUpRight />
                </BookmarkLinkText>
            </BookmarkInfoBox>
        )
    }

    const title = getHost(props.url)

    return (
        <BookmarkInfoBox>
            <BookmarkTitle>{title}</BookmarkTitle>
            <BookmarkLinkText>
                <span>{props.url}</span>
                <SquareArrowOutUpRight />
            </BookmarkLinkText>
        </BookmarkInfoBox>
    )
}

function BookmarkImage(props: { isSuccess: boolean, data: any }) {
    if (props.isSuccess) {
        const image = props.data.open_graph?.images[0].url ?? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

        return (
            <BookmarkImages className={clsx('max-md:hidden')}>
                <BookmarkImageFrame>
                    <BookmarkImg src={image} alt="image" />
                </BookmarkImageFrame>
            </BookmarkImages>
        )
    }
}
