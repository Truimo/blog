import type {Tag} from '@/libs/types'
import {TagText, TagColor} from './styles'

export default function Tags({className, tags}: {
    className?: string,
    tags: Tag[]
}) {
    if (tags.length === 0) {
        return (
            <TagText $color="default" className={className}>无标签</TagText>
        )
    }

    return tags.map((tag) => {
        return (
            <TagText $color={tag.color as TagColor} className={className} key={tag.name}>{tag.name}</TagText>
        )
    })
}
