import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import {SquareArrowOutUpRight} from 'lucide-react'
import {Block, InlineBlock} from './block'
import RichText from './rich-text'
import {bookmarkStyle, desStyle, infoStyle, linkStyle, titleStyle} from './styled/bookmark.css'

export default function Bookmark({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('bookmark' !== block.type) {
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
            }, {
                timeout: 3e3
            })

            return res.data
        }
    })

    return (
        <a className={bookmarkStyle} href={props.url} role="link" target="_blank" rel="noopener noreferrer">
            <BookmarkInfo url={props.url} isSuccess={isSuccess} data={data}/>
        </a>
    )
}

function BookmarkInfo(props: { url: string, isSuccess: boolean, data: any }) {
    if (props.isSuccess) {
        const data = props.data
        const title = data.title ? data.title : getHost(props.url)
        const description = data.description ? data.description : data.open_graph?.description

        return (
            <div className={infoStyle}>
                <p className={titleStyle}>{title}</p>
                <p className={desStyle}>{description}</p>
                <p className={linkStyle}>
                    <span>{props.url}</span>
                    <SquareArrowOutUpRight/>
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
                <SquareArrowOutUpRight/>
            </p>
        </div>
    )
}
