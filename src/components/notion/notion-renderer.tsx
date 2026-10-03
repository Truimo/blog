import type { ReactNode } from "react";
import { Bookmark, LinkPreview } from "@/components/notion/blocks/bookmark";
import { Callout } from "@/components/notion/blocks/callout";
import { Code } from "@/components/notion/blocks/code";
import { Column, ColumnList } from "@/components/notion/blocks/column";
import { Embed } from "@/components/notion/blocks/embed";
import { EquationBlock } from "@/components/notion/blocks/equation";
import { Heading } from "@/components/notion/blocks/heading";
import { BulletList, NumberList } from "@/components/notion/blocks/list";
import { Audio, FileLike, Img, Video } from "@/components/notion/blocks/media";
import {
  Breadcrumb,
  ChildDatabase,
  ChildPage,
  Divider,
  LinkToPage,
  MeetingNotes,
  SyncedBlock,
  Tab,
  TableOfContents,
  Template,
} from "@/components/notion/blocks/misc";
import { Paragraph } from "@/components/notion/blocks/paragraph";
import { Quote } from "@/components/notion/blocks/quote";
import { Table, TableRow } from "@/components/notion/blocks/table";
import { ToDo } from "@/components/notion/blocks/to-do";
import { Toggle } from "@/components/notion/blocks/toggle";
import type { Block } from "@/types";

export function NotionRenderer({ blocks }: { blocks: Block[] }) {
  const ordered = assignOrders(blocks);
  return (
    <>
      {ordered.map(({ block, order }) => (
        <RendererWithChildren key={block.id} block={block} order={order} />
      ))}
    </>
  );
}

function assignOrders(blocks: Block[]): { block: Block; order: number }[] {
  let order = 0;
  return blocks.map((block) => {
    if (block.type === "numbered_list_item") {
      order++;
    } else if (block.type.startsWith("heading_")) {
      order = 0;
    }
    return { block, order };
  });
}

function RendererWithChildren({
  block,
  order,
  isHeaderRow,
}: {
  block: Block;
  order: number;
  isHeaderRow?: boolean;
}) {
  const children = block.has_children ? block.children : null;
  const orderedChildren = assignOrders(children ?? []);
  const isTable = block.type === "table" && block.has_children;
  const hasColumnHeader = isTable && block.table.has_column_header;
  const hasRowHeader = isTable && block.table.has_row_header;
  const childNodes = orderedChildren.map(
    ({ block: child, order: childOrder }, idx) => (
      <RendererWithChildren
        key={child.id}
        block={child}
        order={childOrder}
        isHeaderRow={hasColumnHeader && idx === 0}
      />
    ),
  );
  return (
    <RenderBlock
      block={block}
      order={order}
      isHeaderRow={isHeaderRow}
      isRowHeaderColumn={hasRowHeader}
    >
      {childNodes}
    </RenderBlock>
  );
}

function RenderBlock({
  block,
  order,
  isHeaderRow,
  isRowHeaderColumn,
  children,
}: {
  block: Block;
  order: number;
  isHeaderRow?: boolean;
  isRowHeaderColumn?: boolean;
  children?: ReactNode;
}) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph block={block}>{children}</Paragraph>;
    case "heading_1":
      return (
        <Heading content={block.heading_1} level={1}>
          {children}
        </Heading>
      );
    case "heading_2":
      return (
        <Heading content={block.heading_2} level={2}>
          {children}
        </Heading>
      );
    case "heading_3":
      return (
        <Heading content={block.heading_3} level={3}>
          {children}
        </Heading>
      );
    case "heading_4":
      return (
        <Heading content={block.heading_4} level={4}>
          {children}
        </Heading>
      );
    case "bulleted_list_item":
      return <BulletList block={block}>{children}</BulletList>;
    case "numbered_list_item":
      return (
        <NumberList block={block} order={order}>
          {children}
        </NumberList>
      );
    case "to_do":
      return <ToDo block={block} />;
    case "toggle":
      return <Toggle block={block}>{children}</Toggle>;
    case "quote":
      return <Quote block={block}>{children}</Quote>;
    case "callout":
      return <Callout block={block}>{children}</Callout>;
    case "divider":
      return <Divider />;
    case "equation":
      return <EquationBlock block={block} />;
    case "column_list":
      return (
        <ColumnList columnCount={children ? countColumns(block) : 1}>
          {children}
        </ColumnList>
      );
    case "column":
      return <Column block={block}>{children}</Column>;
    case "table":
      return <Table>{children}</Table>;
    case "table_row":
      return (
        <TableRow
          block={block}
          isHeaderRow={isHeaderRow}
          isRowHeaderColumn={isRowHeaderColumn}
        />
      );
    case "code":
      return <Code block={block} />;
    case "image":
      return <Img block={block} />;
    case "video":
      return <Video block={block} />;
    case "audio":
      return <Audio block={block} />;
    case "file":
      return <FileLike block={block} kind="file" />;
    case "pdf":
      return <FileLike block={block} kind="pdf" />;
    case "bookmark":
      return <Bookmark block={block} />;
    case "link_preview":
      return <LinkPreview block={block} />;
    case "embed":
      return <Embed block={block} />;
    case "breadcrumb":
      return <Breadcrumb />;
    case "table_of_contents":
      return <TableOfContents />;
    case "child_page":
      return <ChildPage title={block.child_page.title} />;
    case "child_database":
      return <ChildDatabase title={block.child_database.title} />;
    case "link_to_page":
      return <LinkToPage target={block.link_to_page} />;
    case "synced_block":
      // synced_from 引用型无法在渲染期取源块，仅渲染携带 children 的副本
      if (block.synced_block.synced_from !== null) return null;
      return <SyncedBlock>{children}</SyncedBlock>;
    case "tab":
      return <Tab />;
    case "template":
      return <Template />;
    case "meeting_notes":
    case "transcription":
      return <MeetingNotes />;
    case "unsupported":
      return null;
    default:
      return null;
  }
}

function countColumns(block: Block): number {
  return block.has_children ? (block.children?.length ?? 1) : 1;
}
