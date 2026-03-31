import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import {clsxm} from '~/libs/helper'
import {colorStyled} from './styled'
import RichText from './rich-text'

export function Heading1({block, children}: PropsWithChildren<{block: BlockObjectResponse}>) {
    if (block.type !== 'heading_1') return null
    const {heading_1} = block
    return (
        <h1 className={clsxm('py-1 text-2xl font-bold leading-relaxed', colorStyled(heading_1.color))}>
            <RichText rich_text={heading_1.rich_text}/>
            {children}
        </h1>
    )
}

export function Heading2({block, children}: PropsWithChildren<{block: BlockObjectResponse}>) {
    if (block.type !== 'heading_2') return null
    const {heading_2} = block
    return (
        <h2 className={clsxm('py-1 text-xl font-bold leading-relaxed', colorStyled(heading_2.color))}>
            <RichText rich_text={heading_2.rich_text}/>
            {children}
        </h2>
    )
}

export function Heading3({block, children}: PropsWithChildren<{block: BlockObjectResponse}>) {
    if (block.type !== 'heading_3') return null
    const {heading_3} = block
    return (
        <h3 className={clsxm('py-1 text-lg font-bold leading-relaxed', colorStyled(heading_3.color))}>
            <RichText rich_text={heading_3.rich_text}/>
            {children}
        </h3>
    )
}
