import moment from 'moment'

export const formatDate = (dateStr: string, format: string = 'YYYY-MM-DD'): string => {
    const date = moment(dateStr)
    return date.format(format)
}
