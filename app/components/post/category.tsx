import type {Category} from '~/types'
import {colorStyled} from '~/components/notion/blocks/styled'

export default function Category({category}: {
    category: Category
}) {
    return (
        <span className={colorStyled(category.color)}>{category.name}</span>
    )
}
