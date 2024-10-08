'use client'

import {useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import type {ImportedDataState} from '@excalidraw/excalidraw/types/data/types'
import {fetchWithExcalidrawUrl} from '@/libs/excalidraw'
import {ExcalidrawLoadError, ExcalidrawLoading} from './ExcalidrawLoading'
import {DynamicExcalidraw} from './ExcalidrawLazy'

export interface ExcalidrawProps {
    url: string
}

export const Excalidraw = ({url}: ExcalidrawProps) => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['excalidraw', url],
        queryFn: async ({queryKey}) => {
            const [_, url] = queryKey
            return await fetchWithExcalidrawUrl(url)
        },
    })

    const initialData: ImportedDataState = useMemo(() => {
        return Object.assign({}, data, {
            scrollToContent: true
        })
    },[data, isLoading, isError])

    if (isLoading) {
        return <ExcalidrawLoading text='Excalidraw 数据加载中...' />
    }

    if (isError) {
        return <ExcalidrawLoadError />
    }

    return (
        <DynamicExcalidraw theme='light' langCode='zh-CN'
                           detectScroll={false} viewModeEnabled={true}
                           initialData={initialData}
        />
    )
}

