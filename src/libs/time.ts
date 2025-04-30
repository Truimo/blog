import 'dayjs/locale/zh-cn'

import dayjs from 'dayjs'

dayjs.locale('zh-cn')

export const formatDate = (dateStr: string, format: string = 'YYYY-MM-DD'): string => {
    const date = dayjs(dateStr)
    return date.format(format)
}
