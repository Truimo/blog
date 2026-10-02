import type {
  BlockObjectResponse,
  PageIconResponse,
} from "@notionhq/client/build/src/api-endpoints.js";
import katex from "katex";
import type { ReactNode } from "react";
import { BookmarkCard } from "@/components/client/bookmark";
import { CodeHighlighter } from "@/components/client/code-highlighter";
import { Mermaid } from "@/components/client/mermaid";
import { RichText } from "@/components/notion/rich-text";
import { colorClass } from "@/lib/colors";
import { clsxm } from "@/lib/utils";
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
    <RenderBlock block={block} order={order} isHeaderRow={isHeaderRow}>
      {childNodes}
    </RenderBlock>
  );
}

function RenderBlock({
  block,
  order,
  isHeaderRow,
  children,
}: {
  block: Block;
  order: number;
  isHeaderRow?: boolean;
  children?: ReactNode;
}) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph block={block}>{children}</Paragraph>;
    case "heading_1":
      return (
        <Heading level={1} block={block}>
          {children}
        </Heading>
      );
    case "heading_2":
      return (
        <Heading level={2} block={block}>
          {children}
        </Heading>
      );
    case "heading_3":
      return (
        <Heading level={3} block={block}>
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
      return <hr className="my-6 border-separator border-t" />;
    case "equation":
      return <EquationBlock block={block} />;
    case "column_list":
      return <ColumnList block={block}>{children}</ColumnList>;
    case "column":
      return <section>{children}</section>;
    case "table":
      return <Table block={block}>{children}</Table>;
    case "table_row":
      return <TableRow block={block} isHeader={isHeaderRow} />;
    case "code":
      return <Code block={block} />;
    case "image":
      return <Img block={block} />;
    case "video":
      return <Video block={block} />;
    case "bookmark":
      return <Bookmark block={block} />;
    case "embed":
      return (
        <div className="my-2 rounded-sm border border-separator bg-surface p-2 text-ink-secondary text-sm">
          Embed: {block.embed.url}
        </div>
      );
    default:
      return (
        <div className="my-2 rounded-sm border border-separator bg-surface p-2 text-ink-secondary text-sm">
          Unsupported: {block.type}
        </div>
      );
  }
}

function BlockWrapper({
  children,
  className,
  color,
}: {
  children?: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div className={clsxm("py-1 leading-normal", className, colorClass(color))}>
      {children}
    </div>
  );
}

function InlineBlock({
  children,
  className,
  color,
}: {
  children?: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <p
      className={clsxm(
        "break-words py-1 leading-normal",
        className,
        colorClass(color),
      )}
    >
      {children}
    </p>
  );
}

function Paragraph({
  block,
  children,
}: {
  block: BlockObjectResponse;
  children?: ReactNode;
}) {
  if (block.type !== "paragraph") return null;
  return (
    <InlineBlock color={block.paragraph.color}>
      <RichText rich_text={block.paragraph.rich_text} />
      {children}
    </InlineBlock>
  );
}

function Heading({
  level,
  block,
  children,
}: {
  level: 1 | 2 | 3;
  block: BlockObjectResponse;
  children?: ReactNode;
}) {
  // 页面级 h1 已由文章标题承担，正文标题统一降一级，避免多个 h1
  if (level === 1 && block.type === "heading_1") {
    return (
      <h2
        className={clsxm(
          "mt-6 mb-2 py-1 font-bold text-2xl leading-snug tracking-tight md:text-3xl",
          colorClass(block.heading_1.color),
        )}
      >
        <RichText rich_text={block.heading_1.rich_text} />
        {children}
      </h2>
    );
  }
  if (level === 2 && block.type === "heading_2") {
    return (
      <h3
        className={clsxm(
          "mt-6 mb-2 py-1 font-semibold text-xl leading-snug tracking-tight md:text-2xl",
          colorClass(block.heading_2.color),
        )}
      >
        <RichText rich_text={block.heading_2.rich_text} />
        {children}
      </h3>
    );
  }
  if (level === 3 && block.type === "heading_3") {
    return (
      <h4
        className={clsxm(
          "mt-5 mb-1 py-1 font-semibold text-lg leading-snug md:text-xl",
          colorClass(block.heading_3.color),
        )}
      >
        <RichText rich_text={block.heading_3.rich_text} />
        {children}
      </h4>
    );
  }
  return null;
}

function BulletList({
  block,
  children,
}: {
  block: BlockObjectResponse;
  children?: ReactNode;
}) {
  if (block.type !== "bulleted_list_item") return null;
  return (
    <>
      <InlineBlock color={block.bulleted_list_item.color}>
        <span className="font-bold">&nbsp;&bull;&nbsp;</span>
        <RichText rich_text={block.bulleted_list_item.rich_text} />
      </InlineBlock>
      <div className="pl-[1em]">{children}</div>
    </>
  );
}

function NumberList({
  block,
  order,
  children,
}: {
  block: BlockObjectResponse;
  order: number;
  children?: ReactNode;
}) {
  if (block.type !== "numbered_list_item") return null;
  return (
    <>
      <InlineBlock color={block.numbered_list_item.color}>
        <span className="font-bold">&nbsp;{order}.&nbsp;</span>
        <RichText rich_text={block.numbered_list_item.rich_text} />
      </InlineBlock>
      <div className="pl-[1em]">{children}</div>
    </>
  );
}

function ToDo({ block }: { block: BlockObjectResponse }) {
  if (block.type !== "to_do") return null;
  return (
    <InlineBlock color={block.to_do.color}>
      <label>
        <input type="checkbox" defaultChecked={block.to_do.checked} readOnly />
        &nbsp;
        <RichText rich_text={block.to_do.rich_text} />
      </label>
    </InlineBlock>
  );
}

function Toggle({
  block,
  children,
}: {
  block: BlockObjectResponse;
  children?: ReactNode;
}) {
  if (block.type !== "toggle") return null;
  return (
    <details>
      <summary>
        <RichText rich_text={block.toggle.rich_text} />
      </summary>
      <BlockWrapper>{children}</BlockWrapper>
    </details>
  );
}

function Quote({
  block,
  children,
}: {
  block: BlockObjectResponse;
  children?: ReactNode;
}) {
  if (block.type !== "quote") return null;
  return (
    <BlockWrapper color={block.quote.color}>
      <blockquote className="my-2 border-separator border-l-2 pl-4">
        <InlineBlock>
          <RichText rich_text={block.quote.rich_text} />
        </InlineBlock>
        {children}
      </blockquote>
    </BlockWrapper>
  );
}

function Callout({
  block,
  children,
}: {
  block: BlockObjectResponse;
  children?: ReactNode;
}) {
  if (block.type !== "callout") return null;
  return (
    <BlockWrapper
      className="my-2 rounded-sm border border-separator px-4 py-3"
      color={block.callout.color}
    >
      <InlineBlock>
        {block.callout.icon && (
          <>
            <Icon icon={block.callout.icon} />
            <span>&nbsp;</span>
          </>
        )}
        <RichText rich_text={block.callout.rich_text} />
      </InlineBlock>
      {children}
    </BlockWrapper>
  );
}

function EquationBlock({ block }: { block: BlockObjectResponse }) {
  if (block.type !== "equation") return null;
  let html: string;
  try {
    html = katex.renderToString(block.equation.expression, {
      throwOnError: false,
      displayMode: true,
      strict: "ignore",
    });
  } catch {
    html = block.equation.expression;
  }
  return (
    <BlockWrapper>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: katex-generated markup */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </BlockWrapper>
  );
}

function ColumnList({
  block,
  children,
}: {
  block: Block;
  children?: ReactNode;
}) {
  if (block.type !== "column_list") return null;
  const col = block.has_children ? (block.children?.length ?? 1) : 1;
  return (
    <BlockWrapper>
      <div
        className="grid grid-cols-1 gap-x-3 md:grid-cols-[repeat(var(--col-count),minmax(0,1fr))]"
        style={{ "--col-count": String(col) } as React.CSSProperties}
      >
        {children}
      </div>
    </BlockWrapper>
  );
}

function Table({
  block,
  children,
}: {
  block: BlockObjectResponse;
  children?: ReactNode;
}) {
  if (block.type !== "table") return null;
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-separator text-sm">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function TableRow({
  block,
  isHeader,
}: {
  block: BlockObjectResponse;
  isHeader?: boolean;
}) {
  if (block.type !== "table_row") return null;
  const Cell = isHeader ? "th" : "td";
  return (
    <tr>
      {block.table_row.cells.map((cell, idx) => (
        <Cell
          // biome-ignore lint/suspicious/noArrayIndexKey: stable ordered cells
          key={idx}
          className={
            isHeader
              ? "border border-separator bg-surface p-2 text-left font-semibold md:p-3"
              : "border border-separator p-2 md:p-3"
          }
        >
          <RichText rich_text={cell} />
        </Cell>
      ))}
    </tr>
  );
}

function Code({ block }: { block: BlockObjectResponse }) {
  if (block.type !== "code") return null;
  const text = block.code.rich_text.map((t) => t.plain_text).join("");

  if (block.code.language === "mermaid") {
    return (
      <BlockWrapper>
        <Mermaid code={text} />
      </BlockWrapper>
    );
  }

  return (
    <BlockWrapper>
      <CodeHighlighter lang={block.code.language} text={text} />
      {block.code.caption.length > 0 && (
        <InlineBlock className="mt-1 text-ink-secondary text-sm">
          <RichText rich_text={block.code.caption} />
        </InlineBlock>
      )}
    </BlockWrapper>
  );
}

function Img({ block }: { block: BlockObjectResponse }) {
  if (block.type !== "image") return null;
  const img = block.image;
  const url =
    img.type === "external"
      ? img.external.url
      : `/api/notion/image/${block.id}`;
  const alt = img.caption.map((c) => c.plain_text).join("");
  return (
    <BlockWrapper className="my-4">
      <figure className="mx-auto w-fit max-w-full">
        {/* biome-ignore lint/performance/noImgElement: remote Notion images without dimensions */}
        <img
          src={url}
          alt={alt}
          loading="lazy"
          className="block w-fit max-w-full object-cover"
        />
        {img.caption.length > 0 && (
          <figcaption className="break-words py-1 text-ink-secondary text-sm">
            <RichText rich_text={img.caption} />
          </figcaption>
        )}
      </figure>
    </BlockWrapper>
  );
}

function Video({ block }: { block: BlockObjectResponse }) {
  if (block.type !== "video") return null;
  const video = block.video;
  const url =
    video.type === "external"
      ? video.external.url
      : `/api/notion/video/${block.id}`;
  return (
    <BlockWrapper className="my-4">
      <div className="mx-auto w-fit max-w-full">
        {/* biome-ignore lint/a11y/useMediaCaption: Notion videos have no caption tracks */}
        <video src={url} controls />
        {video.caption.length > 0 && (
          <InlineBlock className="mt-1 text-ink-secondary text-sm">
            <RichText rich_text={video.caption} />
          </InlineBlock>
        )}
      </div>
    </BlockWrapper>
  );
}

function Bookmark({ block }: { block: BlockObjectResponse }) {
  if (block.type !== "bookmark") return null;
  const url = block.bookmark.url;
  return (
    <BlockWrapper className="my-4">
      <BookmarkCard url={url} endpoint="/api/bookmark" />
      {block.bookmark.caption.length > 0 && (
        <InlineBlock className="mt-1 text-ink-secondary text-sm">
          <RichText rich_text={block.bookmark.caption} />
        </InlineBlock>
      )}
    </BlockWrapper>
  );
}

function Icon({ icon }: { icon: PageIconResponse }) {
  if (icon.type === "emoji") {
    return <span>{icon.emoji}</span>;
  }
  const imgNode = (src: string) => (
    // biome-ignore lint/performance/noImgElement: tiny notion icon without dimensions
    <img className="inline-block h-em object-cover" src={src} alt="icon" />
  );
  if (icon.type === "external") {
    const notion = "https://www.notion.so/icons/";
    const link = icon.external.url.startsWith(notion)
      ? `/api/notion/icons/${icon.external.url.slice(notion.length)}`
      : icon.external.url;
    return imgNode(link);
  }
  if (icon.type === "file") {
    return imgNode(icon.file.url);
  }
  if (icon.type === "custom_emoji") {
    return imgNode(icon.custom_emoji.url);
  }
  return null;
}
