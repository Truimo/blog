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
import {bookmarkStyle, infoStyle, titleStyle, desStyle, linkStyle, iconStyle, imagesStyle, imageStyle, imgStyle} from './styled/bookmark.css'

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
        <a className={bookmarkStyle} href={props.url} role="link" target="_blank" rel="noopener noreferrer">
            <BookmarkInfo url={props.url} isSuccess={isSuccess} data={data} />
            <BookmarkImage isSuccess={isSuccess} data={data} />
        </a>
    )
}

function BookmarkInfo(props: { url: string, isSuccess: boolean, data: any }) {
    if (props.isSuccess) {
        const data = props.data
        const title = data.title ? data.title : getHost(props.url),
            description = data.description ? data.description : data.open_graph?.description,
            favicon = data.favicon
        return (
            <div className={infoStyle}>
                <p className={titleStyle}>{title}</p>
                <p className={desStyle}>{description}</p>
                <p className={linkStyle}>
                    {favicon && (<CamoImage className={iconStyle} src={favicon} alt="icon" />)}
                    <span>{props.url}</span>
                    <SquareArrowOutUpRight />
                </p>
            </div>
        )
    }

    const title = getHost(props.url)

    return (
        <div className={infoStyle}>
            <p className={titleStyle}>{title}</p>
            <p className={linkStyle}>
                <span>{props.url}</span>
                <SquareArrowOutUpRight />
            </p>
        </div>
    )
}

function BookmarkImage(props: { isSuccess: boolean, data: any }) {
    if (props.isSuccess) {
        const image = props.data.open_graph?.images[0].url ?? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

        return (
            <div className={clsx(imagesStyle, 'max-md:hidden')}>
                <div className={imageStyle}>
                    <CamoImage className={imgStyle} src={image} alt="image" />
                </div>
            </div>
        )
    }
}

interface CamoImageProps {
    src: string | undefined
    alt: string
    className?: string
    loading?: "eager" | "lazy" | undefined
}

function CamoImage({ src, alt, className, loading }: CamoImageProps) {
    return (
        <img src={src} alt={alt} className={className} loading={loading} crossOrigin="anonymous"></img>
    )
}
