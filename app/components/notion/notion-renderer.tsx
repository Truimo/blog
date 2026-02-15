import type {PropsWithChildren, ReactElement} from 'react'
import type {Block} from '~/types'
import {Fragment} from 'react'
import Paragraph from './blocks/paragraph'
import {Heading1, Heading2, Heading3} from './blocks/heading'
import NumberList from './blocks/number-list'
import BulletList from './blocks/bullet-list'
import ToDo from './blocks/to-do'
import Toggle from './blocks/toggle'
import Quote from './blocks/quote'
import Callout from './blocks/callout'
import Divider from './blocks/divider'
import EquationBlock from './blocks/equation-block'
import ColumnList from './blocks/column-list'
import Column from './blocks/column'
import Table from './blocks/table'
import TableRow from './blocks/table-row'
import Code from './blocks/code'
import Img from './blocks/img'
import Video from './blocks/video'
import Bookmark from './blocks/bookmark'
import Embed from './blocks/embed'
import NotSupported from './blocks/not-supported'

type RendererProps = PropsWithChildren<{
    block: Block,
    order: number
}>

const blockRenderers: Partial<Record<Block['type'], (props: RendererProps) => ReactElement>> = {
    paragraph: ({block, children}) => <Paragraph block={block}>{children}</Paragraph>,
    heading_1: ({block, children}) => <Heading1 block={block}>{children}</Heading1>,
    heading_2: ({block, children}) => <Heading2 block={block}>{children}</Heading2>,
    heading_3: ({block, children}) => <Heading3 block={block}>{children}</Heading3>,
    bulleted_list_item: ({block, children}) => <BulletList block={block}>{children}</BulletList>,
    numbered_list_item: ({block, children, order}) => <NumberList block={block} order={order}>{children}</NumberList>,
    to_do: ({block, children}) => <ToDo block={block}>{children}</ToDo>,
    toggle: ({block, children}) => <Toggle block={block}>{children}</Toggle>,
    quote: ({block, children}) => <Quote block={block}>{children}</Quote>,
    callout: ({block, children}) => <Callout block={block}>{children}</Callout>,
    divider: ({block, children}) => <Divider block={block}>{children}</Divider>,
    equation: ({block, children}) => <EquationBlock block={block}>{children}</EquationBlock>,
    column_list: ({block, children}) => <ColumnList block={block}>{children}</ColumnList>,
    column: ({block, children}) => <Column block={block}>{children}</Column>,
    table: ({block, children}) => <Table block={block}>{children}</Table>,
    table_row: ({block, children}) => <TableRow block={block}>{children}</TableRow>,
    code: ({block, children}) => <Code block={block}>{children}</Code>,
    image: ({block, children}) => <Img block={block}>{children}</Img>,
    video: ({block, children}) => <Video block={block}>{children}</Video>,
    bookmark: ({block, children}) => <Bookmark block={block}>{children}</Bookmark>,
    embed: ({block, children}) => <Embed block={block}>{children}</Embed>,
}

function Renderer({block, children, order}: RendererProps) {
    const render = blockRenderers[block.type]
    if (render) {
        return render({block, children, order})
    }

    return <NotSupported/>
}

function RendererWithChildren({block, order}: {
    block: Block,
    order: number
}) {
    let childrenOrder = 0
    return (
        <Renderer block={block} order={order}>
            {block.children?.map((child: Block) => {
                if (child.type === 'numbered_list_item') {
                    childrenOrder++
                } else if (child.type.startsWith('heading_')) {
                    childrenOrder = 0
                }

                return <RendererWithChildren key={child.id} block={child} order={childrenOrder}/>
            })}
        </Renderer>
    )
}

export default function NotionRenderer({blocks}: {
    blocks: Block[]
}) {
    let order = 0
    return (
        <Fragment>
            {blocks.map((block) => {
                if (block.type === 'numbered_list_item') {
                    order++
                } else if (block.type.startsWith('heading_')) {
                    order = 0
                }

                return (
                    <RendererWithChildren key={block.id} block={block} order={order}/>
                )
            })}
        </Fragment>
    )
}
