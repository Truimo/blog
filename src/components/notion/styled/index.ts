import {
    RichTextItemResponseCommon,
    TextRichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints'
import { colorVariants, codeTextStyle } from './color.css'

export const colorStyled = (color?: string) => {
    const style: string = undefined === color ? 'current' : color

    if (style in colorVariants) {
        return colorVariants[style as keyof typeof colorVariants]
    }

    return ''
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
        classes.push(codeTextStyle)
        // classes.push('bg-gray-100 dark:bg-zinc-800')
        // classes.push('p-1')
    }
    if (annotations.color) {
        classes.push(colorStyled(annotations.color))
    }
    return classes.join(' ')
}
