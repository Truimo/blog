import { useMemo } from 'react'
import { formatDate } from '@/libs/time'

interface TimeProps {
    datetime: string
}

export function Time(props: TimeProps) {
    const date: string = useMemo(() => {
        return formatDate(props.datetime, 'YYYY 年 MM 月 DD 日')
    }, [props.datetime])

    return (
        <time>{date}</time>
    )
}
