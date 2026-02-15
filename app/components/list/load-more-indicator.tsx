import type {PropsWithChildren} from 'react'
import {useInView} from 'react-intersection-observer'
import { Loading } from '~/components/common/loading'

interface LoadMoreIndicatorProps extends PropsWithChildren {
    className?: string
    onLoading: () => void
}

export function LoadMoreIndicator({ className, children, onLoading }: LoadMoreIndicatorProps) {
    const { ref } = useInView({
        rootMargin: '1px',
        onChange(inView) {
            if (inView) {
                onLoading()
            }
        },
    })

    return (
        <div className={className} ref={ref}>
            {children ?? <Loading />}
        </div>
    )
}
