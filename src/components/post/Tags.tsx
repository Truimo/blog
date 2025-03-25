import type {Tag} from '@/libs/types'
import clsx from 'clsx'
import {tagTextStyle, colorVariants} from './styled.css'

function colorStyled(color: string) {    
    if (color in colorVariants) {
        return colorVariants[color as keyof typeof colorVariants]
    }

    return ''
}

export default function Tags({className, tags}: {
    className?: string,
    tags: Tag[]
}) {
    return tags.map((tag) => {
        return (
            <span className={clsx(tagTextStyle, colorStyled(tag.color), className)} key={tag.name}>{tag.name}</span>
        )
    })
}
