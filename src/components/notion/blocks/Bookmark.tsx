'use client'

import {useQuery} from '@tanstack/react-query'
import {SquareArrowOutUpRight} from 'lucide-react'
import axios from 'axios'
import {Block, InlineBlock} from '@/components/notion/blocks/Block'
import RichText from '@/components/notion/blocks/RichText'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
// import {urlSafeBase64Encode} from "@/libs/base64";
import {CamoImage} from '@/components/common/Image'

export default function Bookmark({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('bookmark' !== block.type) {
        return null
    }
    const bookmark = block.bookmark
    const {data, isLoading, isError} = useQuery({
        queryKey: ['bookmark', block.id],
        queryFn: async () => {
            const res = await axios.post('/api/bookmark', {
                url: bookmark.url
            }, {
                timeout: 3e3,
            })
            return res.data
        }
    })
    return (
        <Block>
            <Inner url={bookmark.url} data={data} isLoading={isLoading} isError={isError}/>
            {bookmark.caption.length > 0 && (
                <InlineBlock className="text-neutral-500 text-sm">
                    <RichText rich_text={bookmark.caption}/>
                </InlineBlock>
            )}
        </Block>
    )
}

interface InnerProps {
    url: string
    data: any
    isLoading: boolean
    isError: boolean
}

function Inner({url, data, isLoading, isError}: InnerProps) {
    if (isLoading) {
        return (
            <div className="select-none text-gray-600 flex items-stretch border border-gray-300 h-28 overflow-hidden">
                <div className="flex-auto w-4/6 p-3 pt-2.5 animate-pulse">
                    <div className="font-semibold truncate mb-1 h-5 rounded bg-gray-200 w-2/5"></div>
                    <div className="text-xs line-clamp-2 mb-1 h-4 rounded bg-gray-200 w-4/5"></div>
                    <div className="text-xs line-clamp-2 mb-2 h-4 rounded bg-gray-200 w-3/5"></div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 rounded" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        </svg>
                        <span className="truncate">
                            <a href={url} rel="noopener noreferrer" target="_blank">{url}</a>
                        </span>
                    </div>
                </div>
                <div className="flex-auto w-2/6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gray-100"></div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <p className="select-none text-gray-600 p-2 border border-gray-300 space-x-1 truncate">
                <a href={url} rel="noopener noreferrer" target="_blank">
                    <span>{url}</span>
                    <SquareArrowOutUpRight />
                </a>
            </p>
        )
    }

    const {title, description, open_graph, oEmbed, twitter_card} = data
    const favicon = data.favicon.replace(/^http:\/\//, 'https://')
    const image = open_graph?.images?.[0].url ?? twitter_card?.images?.[0].url ?? oEmbed?.thumbnails?.[0].url ?? null

    const faviconUrl = favicon ? favicon : undefined
    const imageUrl = image ? image.replace(/^http:\/\//, 'https://') : undefined

    return (
        <a href={url} rel="noopener noreferrer" target="_blank" className="block">
            <div className="select-none text-gray-600 flex items-stretch border border-gray-300 overflow-hidden">
                <div className="flex-auto w-4/6 p-3 pt-2.5 transition-colors ease-in-out duration-150">
                    <div className="font-semibold truncate mb-1">{title}</div>
                    <div className="text-xs line-clamp-2 mb-2 text-gray-400 dark:text-gray-500">
                        {description ? description : open_graph?.description}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400 dark:text-gray-500">
                        <CamoImage className="h-4 w-4 rounded" src={faviconUrl} alt="favicon"/>
                        <span className="truncate">{url}</span>
                    </div>
                </div>
                <div className="flex-auto w-2/6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800">
                        {image ? (<div className="w-full h-full">
                            <CamoImage src={imageUrl} alt={title} className="w-full h-full object-cover"/>
                        </div>) : (<div className="w-full h-full flex justify-center items-center">
                            <CamoImage src={faviconUrl} alt={title} className="rounded-full h-10 w-10"/>
                        </div>)}
                    </div>
                </div>
            </div>
        </a>
    )
}
