import type { Handle, RemixNode } from 'remix/component'
import { unsafeHTML } from 'remix/component'
import type { BlockObjectResponse, PageIconResponse } from '@notionhq/client/build/src/api-endpoints.js'
import katex from 'katex'
import { clsxm } from '../../libs/helper.ts'
import { routes } from '../../routes.ts'
import type { Block } from '../../types.d.ts'
import { colorStyled } from './colors.ts'
import { RichText } from './rich-text.tsx'
import { CodeHighlighter } from '../../assets/code-highlighter.tsx'
import { BookmarkCard } from '../../assets/bookmark.tsx'
import { Mermaid } from '../../assets/mermaid.tsx'

export interface NotionRendererProps {
    blocks: Block[]
}

export function NotionRenderer(handle: Handle<NotionRendererProps>) {
    return () => {
        const { blocks } = handle.props
        const ordered = assignOrders(blocks)
        return (
            <>
                {ordered.map(({ block, order }) => (
                    <RendererWithChildren key={block.id} block={block} order={order} />
                ))}
            </>
        )
    }
}

function assignOrders(blocks: Block[]): { block: Block; order: number }[] {
    let order = 0
    return blocks.map((block) => {
        if (block.type === 'numbered_list_item') {
            order++
        } else if (block.type.startsWith('heading_')) {
            order = 0
        }
        return { block, order }
    })
}

function RendererWithChildren(handle: Handle<{ block: Block; order: number; isHeaderRow?: boolean }>) {
    return () => {
        const { block, order, isHeaderRow } = handle.props
        const children = block.has_children ? block.children : null
        const orderedChildren = assignOrders(children ?? [])
        const isTable = block.type === 'table' && block.has_children
        const hasColumnHeader = isTable && block.table.has_column_header
        const childNodes = orderedChildren.map(({ block: child, order: childOrder }, idx) => (
            <RendererWithChildren key={child.id} block={child} order={childOrder} isHeaderRow={hasColumnHeader && idx === 0} />
        ))
        return <RenderBlock block={block} order={order} isHeaderRow={isHeaderRow}>{childNodes}</RenderBlock>
    }
}

function RenderBlock(handle: Handle<{ block: Block; order: number; isHeaderRow?: boolean; children?: RemixNode }>) {
    return () => {
        const { block, order, isHeaderRow, children } = handle.props
        switch (block.type) {
            case 'paragraph':
                return <Paragraph block={block}>{children}</Paragraph>
            case 'heading_1':
                return <Heading level={1} block={block}>{children}</Heading>
            case 'heading_2':
                return <Heading level={2} block={block}>{children}</Heading>
            case 'heading_3':
                return <Heading level={3} block={block}>{children}</Heading>
            case 'bulleted_list_item':
                return <BulletList block={block}>{children}</BulletList>
            case 'numbered_list_item':
                return <NumberList block={block} order={order}>{children}</NumberList>
            case 'to_do':
                return <ToDo block={block} />
            case 'toggle':
                return <Toggle block={block}>{children}</Toggle>
            case 'quote':
                return <Quote block={block}>{children}</Quote>
            case 'callout':
                return <Callout block={block}>{children}</Callout>
            case 'divider':
                return <hr class="my-6 border-t border-separator" />
            case 'equation':
                return <EquationBlock block={block} />
            case 'column_list':
                return <ColumnList block={block}>{children}</ColumnList>
            case 'column':
                return <section>{children}</section>
            case 'table':
                return <Table block={block}>{children}</Table>
            case 'table_row':
                return <TableRow block={block} isHeader={isHeaderRow} />
            case 'code':                return <Code block={block} />
            case 'image':
                return <Img block={block} />
            case 'video':
                return <Video block={block} />
            case 'bookmark':
                return <Bookmark block={block} />
            case 'embed':
                return <div class="my-2 p-2 bg-surface border border-separator rounded-sm text-sm text-ink-secondary">Embed: {block.embed.url}</div>
            default:
                return <div class="my-2 p-2 bg-surface border border-separator rounded-sm text-sm text-ink-secondary">Unsupported: {block.type}</div>
        }
    }
}

function Block(handle: Handle<{ children?: RemixNode; className?: string; color?: string }>) {
    return () => {
        const { children, className, color } = handle.props
        return <div class={clsxm('py-1 leading-normal', className)} mix={colorStyled(color)}>{children}</div>
    }
}

function InlineBlock(handle: Handle<{ children?: RemixNode; className?: string; color?: string }>) {
    return () => {
        const { children, className, color } = handle.props
        return <p class={clsxm('py-1 leading-normal break-words', className)} mix={colorStyled(color)}>{children}</p>
    }
}

function Paragraph(handle: Handle<{ block: BlockObjectResponse; children?: RemixNode }>) {
    return () => {
        const { block, children } = handle.props
        if (block.type !== 'paragraph') return null
        return <InlineBlock color={block.paragraph.color}><RichText rich_text={block.paragraph.rich_text} />{children}</InlineBlock>
    }
}

function Heading(handle: Handle<{ level: 1 | 2 | 3; block: BlockObjectResponse; children?: RemixNode }>) {
    return () => {
        const { level, block, children } = handle.props
        // 页面级 h1 已由文章标题承担，正文标题统一降一级，避免多个 h1
        if (level === 1 && block.type === 'heading_1') {
            return <h2 class="mt-6 mb-2 py-1 text-2xl md:text-3xl font-bold tracking-tight leading-snug" mix={colorStyled(block.heading_1.color)}><RichText rich_text={block.heading_1.rich_text} />{children}</h2>
        }
        if (level === 2 && block.type === 'heading_2') {
            return <h3 class="mt-6 mb-2 py-1 text-xl md:text-2xl font-semibold tracking-tight leading-snug" mix={colorStyled(block.heading_2.color)}><RichText rich_text={block.heading_2.rich_text} />{children}</h3>
        }
        if (level === 3 && block.type === 'heading_3') {
            return <h4 class="mt-5 mb-1 py-1 text-lg md:text-xl font-semibold leading-snug" mix={colorStyled(block.heading_3.color)}><RichText rich_text={block.heading_3.rich_text} />{children}</h4>
        }
        return null
    }
}

function BulletList(handle: Handle<{ block: BlockObjectResponse; children?: RemixNode }>) {
    return () => {
        const { block, children } = handle.props
        if (block.type !== 'bulleted_list_item') return null
        return (
            <>
                <InlineBlock color={block.bulleted_list_item.color}>
                    <span class="font-bold">&nbsp;&bull;&nbsp;</span>
                    <RichText rich_text={block.bulleted_list_item.rich_text} />
                </InlineBlock>
                <div class="pl-[1em]">{children}</div>
            </>
        )
    }
}

function NumberList(handle: Handle<{ block: BlockObjectResponse; order: number; children?: RemixNode }>) {
    return () => {
        const { block, order, children } = handle.props
        if (block.type !== 'numbered_list_item') return null
        return (
            <>
                <InlineBlock color={block.numbered_list_item.color}>
                    <span class="font-bold">&nbsp;{order}.&nbsp;</span>
                    <RichText rich_text={block.numbered_list_item.rich_text} />
                </InlineBlock>
                <div class="pl-[1em]">{children}</div>
            </>
        )
    }
}

function ToDo(handle: Handle<{ block: BlockObjectResponse }>) {
    return () => {
        const { block } = handle.props
        if (block.type !== 'to_do') return null
        return (
            <InlineBlock color={block.to_do.color}>
                <label>
                    <input type="checkbox" defaultChecked={block.to_do.checked} />&nbsp;<RichText rich_text={block.to_do.rich_text} />
                </label>
            </InlineBlock>
        )
    }
}

function Toggle(handle: Handle<{ block: BlockObjectResponse; children?: RemixNode }>) {
    return () => {
        const { block, children } = handle.props
        if (block.type !== 'toggle') return null
        return (
            <details>
                <summary><RichText rich_text={block.toggle.rich_text} /></summary>
                <Block>{children}</Block>
            </details>
        )
    }
}

function Quote(handle: Handle<{ block: BlockObjectResponse; children?: RemixNode }>) {
    return () => {
        const { block, children } = handle.props
        if (block.type !== 'quote') return null
        return (
            <Block color={block.quote.color}>
                <blockquote class="my-2 pl-4 border-l-2 border-separator">
                    <InlineBlock><RichText rich_text={block.quote.rich_text} /></InlineBlock>
                    {children}
                </blockquote>
            </Block>
        )
    }
}

function Callout(handle: Handle<{ block: BlockObjectResponse; children?: RemixNode }>) {
    return () => {
        const { block, children } = handle.props
        if (block.type !== 'callout') return null
        return (
            <Block className="my-2 px-4 py-3 border-separator rounded-sm border" color={block.callout.color}>
                <InlineBlock>
                    {block.callout.icon && <><Icon icon={block.callout.icon} /><span>&nbsp;</span></>}
                    <RichText rich_text={block.callout.rich_text} />
                </InlineBlock>
                {children}
            </Block>
        )
    }
}

function EquationBlock(handle: Handle<{ block: BlockObjectResponse }>) {
    return () => {
        const { block } = handle.props
        if (block.type !== 'equation') return null
        let html: string
        try {
            html = katex.renderToString(block.equation.expression, {
                throwOnError: false,
                displayMode: true,
                strict: 'ignore',
            })
        } catch {
            html = block.equation.expression
        }
        return <Block><div innerHTML={unsafeHTML(html)} /></Block>
    }
}

function ColumnList(handle: Handle<{ block: Block; children?: RemixNode }>) {
    return () => {
        const { block, children } = handle.props
        if (block.type !== 'column_list') return null
        const col = block.has_children ? (block.children?.length ?? 1) : 1
        return (
            <Block>
                <div class="grid gap-x-3 grid-cols-1 md:grid-cols-[repeat(var(--col-count),minmax(0,1fr))]" style={{ '--col-count': String(col) } as Record<string, string>}>{children}</div>
            </Block>
        )
    }
}

function Table(handle: Handle<{ block: BlockObjectResponse; children?: RemixNode }>) {
    return () => {
        const { block, children } = handle.props
        if (block.type !== 'table') return null
        return (
            <div class="my-4 overflow-x-auto">
                <table class="table-auto border-collapse w-full border border-separator text-sm"><tbody>{children}</tbody></table>
            </div>
        )
    }
}

function TableRow(handle: Handle<{ block: BlockObjectResponse; isHeader?: boolean }>) {
    return () => {
        const { block, isHeader } = handle.props
        if (block.type !== 'table_row') return null
        const Cell = isHeader ? 'th' : 'td'
        return (
            <tr>{block.table_row.cells.map((cell, idx) => (
                <Cell key={idx} class={isHeader ? 'border border-separator p-2 md:p-3 font-semibold bg-surface text-left' : 'border border-separator p-2 md:p-3'}><RichText rich_text={cell} /></Cell>
            ))}</tr>
        )
    }
}

function Code(handle: Handle<{ block: BlockObjectResponse }>) {
    return () => {
        const { block } = handle.props
        if (block.type !== 'code') return null
        const text = block.code.rich_text.map((t) => t.plain_text).join('')

        if (block.code.language === 'mermaid') {
            return <Block><Mermaid code={text} /></Block>
        }

        return (
            <Block>
                <CodeHighlighter lang={block.code.language} text={text} />
                {block.code.caption.length > 0 && <InlineBlock className="text-ink-secondary text-sm mt-1"><RichText rich_text={block.code.caption} /></InlineBlock>}
            </Block>
        )
    }
}

function Img(handle: Handle<{ block: BlockObjectResponse }>) {
    return () => {
        const { block } = handle.props
        if (block.type !== 'image') return null
        const img = block.image
        const url = img.type === 'external' ? img.external.url : routes.apiNotionImage.href({ id: block.id })
        const alt = img.caption.map((c) => c.plain_text).join('')
        return (
            <Block className="my-4">
                <figure class="max-w-full w-fit mx-auto">
                    <img src={url} alt={alt} loading="lazy" class="block max-w-full w-fit object-cover" />
                    {img.caption.length > 0 && <figcaption class="py-1 break-words text-ink-secondary text-sm"><RichText rich_text={img.caption} /></figcaption>}
                </figure>
            </Block>
        )
    }
}

function Video(handle: Handle<{ block: BlockObjectResponse }>) {
    return () => {
        const { block } = handle.props
        if (block.type !== 'video') return null
        const video = block.video
        const url = video.type === 'external' ? video.external.url : routes.apiNotionVideo.href({ id: block.id })
        return (
            <Block className="my-4">
                <div class="max-w-full w-fit mx-auto">
                    <video src={url} controls></video>
                    {video.caption.length > 0 && <InlineBlock className="text-ink-secondary text-sm mt-1"><RichText rich_text={video.caption} /></InlineBlock>}
                </div>
            </Block>
        )
    }
}

function Bookmark(handle: Handle<{ block: BlockObjectResponse }>) {
    return () => {
        const { block } = handle.props
        if (block.type !== 'bookmark') return null
        const url = block.bookmark.url
        return (
            <Block className="my-4">
                <BookmarkCard url={url} endpoint={routes.apiBookmark.href()} />
                {block.bookmark.caption.length > 0 && <InlineBlock className="text-ink-secondary text-sm mt-1"><RichText rich_text={block.bookmark.caption} /></InlineBlock>}
            </Block>
        )
    }
}

function Icon(handle: Handle<{ icon: PageIconResponse }>) {
    return () => {
        const { icon } = handle.props
        if (icon.type === 'emoji') {
            return <span>{icon.emoji}</span>
        }
        if (icon.type === 'external') {
            const notion = 'https://www.notion.so/icons/'
            const link = icon.external.url.startsWith(notion) ? routes.apiNotionIcons.href({ filename: icon.external.url.slice(notion.length) }) : icon.external.url
            return <img class="inline-block object-cover h-em" src={link} alt="icon" />
        }
        if (icon.type === 'file') {
            return <img class="inline-block object-cover h-em" src={icon.file.url} alt="icon" />
        }
        if (icon.type === 'custom_emoji') {
            return <img class="inline-block object-cover h-em" src={icon.custom_emoji.url} alt="icon" />
        }
        return null
    }
}
