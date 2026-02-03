import type { RichTextItemResponseCommon } from '@notionhq/client/build/src/api-endpoints'
import { getNotionColorClass, notionCodeClass } from './styles'

export const colorStyled = (color?: string) => {
    return getNotionColorClass(color)
}

export const textStyeld = (annotations: RichTextItemResponseCommon['annotations']) => {
    const classes: string[] = []
    if (annotations.bold) {
        classes.push('font-bold')
    }
    if (annotations.italic) {
        classes.push('italic')
    }
    if (annotations.strikethrough) {
        classes.push('line-through')
    }
    if (annotations.underline) {
        classes.push('underline')
    }
    if (annotations.code) {
        classes.push('font-mono')
        classes.push(notionCodeClass)
        // classes.push('bg-gray-100 dark:bg-zinc-800')
        // classes.push('p-1')
    }
    if (annotations.color) {
        classes.push(getNotionColorClass(annotations.color))
    }
    return classes.join(' ')
}
