'use client'

import {isServer} from '@tanstack/react-query'
import {useRef, useEffect, useState, useCallback} from 'react'
import mediumZoom from 'medium-zoom'
import RichText from '@/components/notion/blocks/RichText'
import {Block} from '@/components/notion/blocks/Block'
import {useIsUnMounted} from '@/hooks/use-is-unmounted'
import type {Zoom} from 'medium-zoom'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

export enum ImageLoadStatus {
    Loading = 'loading',
    Loaded = 'loaded',
    Error = 'error',
}

let zoomer: Zoom

export default function Img({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    const isUnmount = useIsUnMounted()
    const imageRef = useRef<HTMLImageElement>(null)
    const [imageLoadStatus, setImageLoadStatus] = useState(ImageLoadStatus.Loading)
    const setImageLoadStatusSafe = useCallback((status: ImageLoadStatus) => {
        if (!isUnmount.current) {
            setImageLoadStatus(status)
        }
    }, [isUnmount])
    const [zooms] = useState(() => {
        if (isServer) {
            return null
        }
        if (zoomer) {
            return zoomer
        }
        const zoom = mediumZoom({
            background: 'rgb(248, 250, 252)'
        })
        zoomer = zoom
        return zoom
    })
    useEffect(() => {
        const $image = imageRef.current
        if (null === $image) {
            return
        }
        if (!$image.complete && imageLoadStatus !== ImageLoadStatus.Loaded) {
            return
        }
        zooms?.attach($image)
        return () => {
            zooms?.detach($image)
        }
    }, [zooms, imageLoadStatus])

    if ('image' !== block.type) {
        return null
    }

    const img = block.image
    const url = img.type === 'external' ? img.external.url : `/api/notion/image/${block.id}`
    const alt = img.caption.map((block) => block.plain_text).join('')

    return <Block>
        <figure className="max-w-full w-fit mx-auto">
            <img ref={imageRef} src={url} alt={alt} loading="lazy" className="block max-w-full w-fit object-cover"
                 onLoad={() => {
                     setImageLoadStatusSafe(ImageLoadStatus.Loaded)}
                 }
                 onError={() => {
                     setImageLoadStatusSafe(ImageLoadStatus.Error)
                 }}
            />
            {img.caption.length > 0 && (<figcaption className="py-1 break-words text-neutral-500 text-sm">
                <RichText rich_text={img.caption}/>
            </figcaption>)}
        </figure>
    </Block>
}


