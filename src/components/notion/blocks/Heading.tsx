import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import clsx from 'clsx'
import RichText from '@/components/notion/blocks/RichText'
import {colorStyled} from '@/components/notion/styled'

export function Heading1({ block }: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('heading_1' !== block.type) {
        return null
    }
    const heading_1 = block.heading_1
    return (
        <h1 className={clsx('py-1 text-2xl font-bold leading-relaxed', colorStyled(heading_1.color))}><RichText rich_text={heading_1.rich_text}/></h1>
    )
}

export function Heading2({ block }: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('heading_2' !== block.type) {
        return null
    }
    const heading_2 = block.heading_2
    return (
        <h2 className={clsx('py-1 text-xl font-bold leading-relaxed', colorStyled(heading_2.color))}><RichText rich_text={heading_2.rich_text}/></h2>
    )
}

export function Heading3({ block }: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('heading_3' !== block.type) {
        return null
    }
    const heading_3 = block.heading_3
    return (
        <h3 className={clsx('py-1 text-lg font-bold leading-relaxed', colorStyled(heading_3.color))}><RichText rich_text={heading_3.rich_text}/></h3>
    )
}
