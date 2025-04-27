'use client'

import {useInView} from 'react-intersection-observer'
import type {PropsWithChildren, FC} from 'react'
import Loading from '@/components/Loading'

export const LoadMoreIndicator: FC<PropsWithChildren<{
    className?: string,
    onLoading: () => void
}>> = ({ className, children, onLoading }) => {
    const { ref } = useInView({
        rootMargin: '1px',
        onChange(inView) {
            if (inView) onLoading()
        },
    })

    return (
        <div className={className} ref={ref}>
            {children ?? <Loading />}
        </div>
    )
}
