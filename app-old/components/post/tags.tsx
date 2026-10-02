import type {Tag} from '~/types'
import {clsxm} from '~/libs/helper'
import {colorVariants, tagTextStyle} from './styled.css'

function colorStyled(color: string) {
    if (color in colorVariants) {
        return colorVariants[color as keyof typeof colorVariants]
    }
    return ''
}

export default function Tags({className, tags}: {
    className?: string
    tags: Tag[]
}) {
    if (tags.length === 0) {
        return (
            <span className={clsxm(tagTextStyle, colorStyled('default'), className)}>无标签</span>
        )
    }

    return tags.map((tag) => (
        <span className={clsxm(tagTextStyle, colorStyled(tag.color), className)} key={tag.name}>{tag.name}</span>
    ))
}
