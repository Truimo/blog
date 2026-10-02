import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import type {Metadata} from 'unfurl.js/dist/types'
import {useQuery} from '@tanstack/react-query'
import {SquareArrowOutUpRight} from 'lucide-react'
import {Block, InlineBlock} from './block'
import RichText from './rich-text'
import {bookmarkStyle, desStyle, infoStyle, linkStyle, titleStyle} from './styled/bookmark.css'

export default function Bookmark({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if (block.type !== 'bookmark') {
        return null
    }
    const bookmark = block.bookmark

    return (
        <Block>
            <BookmarkInner id={block.id} url={bookmark.url}/>
            {bookmark.caption.length > 0 && (
                <InlineBlock className="text-neutral-500 text-sm">
                    <RichText rich_text={bookmark.caption}/>
                </InlineBlock>
            )}
        </Block>
    )
}

function getHost(url: string): string {
    try {
        return new URL(url).hostname
    } catch {
        return url
    }
}

interface BookmarkInnerProps {
    id: string
    url: string
}

const BookmarkInner = ({id, url}: BookmarkInnerProps) => {
    const {data, isSuccess} = useQuery({
        queryKey: ['bookmark', id],
        queryFn: async (): Promise<Metadata> => {
            const res = await fetch('/api/bookmark', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({url}),
                signal: AbortSignal.timeout(3000),
            })
            if (!res.ok) throw new Error('Failed to fetch bookmark')
            return res.json() as Promise<Metadata>
        },
        staleTime: Infinity,
        gcTime: Infinity,
    })

    return (
        <a className={bookmarkStyle} href={url} role="link" target="_blank" rel="noopener noreferrer">
            <BookmarkInfo url={url} isSuccess={isSuccess} data={data}/>
        </a>
    )
}

function BookmarkInfo({url, isSuccess, data}: {url: string; isSuccess: boolean; data: Metadata | undefined}) {
    const host = getHost(url)

    if (isSuccess && data) {
        const title = data.title ?? host
        const description = data.description ?? data.open_graph?.description

        return (
            <div className={infoStyle}>
                <p className={titleStyle}>{title}</p>
                {description && <p className={desStyle}>{description}</p>}
                <p className={linkStyle}>
                    <span>{url}</span>
                    <SquareArrowOutUpRight/>
                </p>
            </div>
        )
    }

    return (
        <div className={infoStyle}>
            <p className={titleStyle}>{host}</p>
            <p className={linkStyle}>
                <span>{url}</span>
                <SquareArrowOutUpRight/>
            </p>
        </div>
    )
}
