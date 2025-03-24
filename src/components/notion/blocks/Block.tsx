import type {PropsWithChildren} from 'react'
import {clsxm} from '@/libs/helper'
import {colorStyled} from '@/components/notion/styled'

export function InlineBlock({children, className, color}: PropsWithChildren<{
    className?: string
    color?: string
}>) {
    return <p className={clsxm('py-1 leading-normal break-words', colorStyled(color), className)}>{children}</p>
}

export function Block({children, className, color}: PropsWithChildren<{
    className?: string
    color?: string
}>) {
    return (
        <div className={clsxm('py-1 leading-normal', colorStyled(color), className)}>{children}</div>
    )
}
