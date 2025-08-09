import {Block} from '@/components/notion/blocks/Block'
import type {PropsWithChildren} from 'react'
import type {Block as BlockType} from '@/libs/notion'

export default function ColumnList({block, children}: PropsWithChildren<{
    block: BlockType
}>) {
    if ('column_list' !== block.type) {
        return null
    }
    const col = block.children?.length ?? 1
    return (
        <Block>
            <div className="grid gap-x-3" style={{
                gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`
            }}>
                {children}
            </div>
        </Block>
    )
}
