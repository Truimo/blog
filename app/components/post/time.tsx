import {formatDate} from '~/libs/time'

interface TimeProps {
    datetime: string
}

export function Time({datetime}: TimeProps) {
    const dateStr = formatDate(datetime, 'YYYY[ 年 ]MM[ 月 ]DD[ 日 ]')

    return (
        <time dateTime={datetime} suppressHydrationWarning={true}>{dateStr}</time>
    )
}
