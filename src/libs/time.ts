import dayjs from 'dayjs'

export const formatDate = (dateStr: string, format: string = 'YYYY-MM-DD'): string => {
    const date = dayjs(dateStr)
    return date.format(format)
}
