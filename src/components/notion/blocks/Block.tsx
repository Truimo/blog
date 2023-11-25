import {getAnnotationsColor} from '@/libs/notion'
import {clsxm} from '@/libs/helper'
import type {PropsWithChildren} from 'react'

export function InlineBlock({children, className, color}: PropsWithChildren<{
    className?: string
    color?: string
}>) {
    const colorClass: string | null = color ? getAnnotationsColor(color) : null
    return <p className={clsxm('py-1 leading-normal break-words', colorClass, className)}>{children}</p>
}

export function Block({children, className, color}: PropsWithChildren<{
    className?: string
    color?: string
}>) {
    const colorClass: string | null = color ? getAnnotationsColor(color) : null
    return (
        <div className={clsxm('py-1 leading-normal', colorClass, className)}>{children}</div>
    )
}
