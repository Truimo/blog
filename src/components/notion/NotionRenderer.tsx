import type {PropsWithChildren} from 'react'
import type {Block} from '@/libs/notion'
import Paragraph from './blocks/Paragraph'
import {Heading1, Heading2, Heading3} from './blocks/Heading'
import NumberList from './blocks/NumberList'
import BulletList from './blocks/BulletList'
import ToDo from './blocks/ToDo'
import Toggle from './blocks/Toggle'
import Quote from './blocks/Quote'
import Callout from './blocks/Callout'
import Divider from './blocks/Divider'
import EquationBlock from './blocks/EquationBlock'
import ColumnList from './blocks/ColumnList'
import Column from './blocks/Column'
import Table from './blocks/Table'
import TableRow from './blocks/TableRow'
import Code from './blocks/Code'
import Img from './blocks/Img'
import Video from './blocks/Video'
import Bookmark from './blocks/Bookmark'
import NotSupported from './blocks/NotSupported'
import Embed from './blocks/Embed'

function Renderer({block, children, order}: PropsWithChildren<{
    block: Block,
    order: number
}>) {
    switch (block.type) {
        case 'paragraph':
            return <Paragraph block={block}>{children}</Paragraph>
        case 'heading_1':
            return <Heading1 block={block}>{children}</Heading1>
        case 'heading_2':
            return <Heading2 block={block}>{children}</Heading2>
        case 'heading_3':
            return <Heading3 block={block}>{children}</Heading3>
        case 'bulleted_list_item':
            return <BulletList block={block}>{children}</BulletList>
        case 'numbered_list_item':
            return <NumberList block={block} order={order}>{children}</NumberList>
        case 'to_do':
            return <ToDo block={block}>{children}</ToDo>
        case 'toggle':
            return <Toggle block={block}>{children}</Toggle>
        case 'quote':
            return <Quote block={block}>{children}</Quote>
        case 'callout':
            return <Callout block={block}>{children}</Callout>
        case 'divider':
            return <Divider block={block}>{children}</Divider>
        case 'equation':
            return <EquationBlock block={block}>{children}</EquationBlock>
        case 'column_list':
            return <ColumnList block={block}>{children}</ColumnList>
        case 'column':
            return <Column block={block}>{children}</Column>
        case 'table':
            return <Table block={block}>{children}</Table>
        case 'table_row':
            return <TableRow block={block}>{children}</TableRow>
        case 'code':
            return <Code block={block}>{children}</Code>
        case 'image':
            return <Img block={block}>{children}</Img>
        case 'video':
            return <Video block={block}>{children}</Video>
        case 'bookmark':
            return <Bookmark block={block}>{children}</Bookmark>
        case 'embed':
            return <Embed block={block}>{children}</Embed>
        default:
            return <NotSupported />
    }
}

function RendererWithChildren({block, order}: {
    block: Block,
    order: number
}) {
    let childrenOrder = 0
    return (
        <Renderer block={block} order={order}>
            {block.children?.map((child) => {
                if (child.type === 'numbered_list_item') {
                    childrenOrder++
                } else if (child.type.startsWith('heading_')) {
                    childrenOrder = 0
                }

                return <RendererWithChildren key={child.id} block={child} order={childrenOrder} />
            })}
        </Renderer>
    )
}

export default function NotionRenderer({blocks}: {
    blocks: Block[]
}) {
    let order = 0
    return (
        <>
            {blocks.map((block) => {
                if (block.type === 'numbered_list_item') {
                    order++
                } else if (block.type.startsWith('heading_')) {
                    order = 0
                }

                return (
                    <RendererWithChildren key={block.id} block={block} order={order} />
                )
            })}
        </>
    )
}
