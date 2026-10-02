import {useInView} from 'react-intersection-observer'
import {Loading} from '~/components/common/loading'

interface LoadMoreIndicatorProps {
    className?: string
    onLoading: () => void
}

export function LoadMoreIndicator({className, onLoading}: LoadMoreIndicatorProps) {
    const {ref} = useInView({
        rootMargin: '200px',
        onChange(inView) {
            if (inView) {
                onLoading()
            }
        },
    })

    return (
        <div className={className} ref={ref}>
            <Loading/>
        </div>
    )
}
