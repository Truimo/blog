import type {Category} from '@/libs/types'
import {getTextColor} from "@/libs/colors";

export default function Category({category}: {
    category: Category
}) {
    const colorClass = getTextColor(category.color)
    return (
        <span className={colorClass}>{category.name}</span>
    )
}
