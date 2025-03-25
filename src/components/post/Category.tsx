import type {Category} from '@/libs/types'
import {colorStyled} from '@/components/notion/styled'

export default function Category({category}: {
    category: Category
}) {
    return (
        <span className={colorStyled(category.color)}>{category.name}</span>
    )
}
