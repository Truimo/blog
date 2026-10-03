import type {
  ChildDatabaseBlockObjectResponse,
  ChildPageBlockObjectResponse,
  LinkToPageBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints.js";
import type { ReactNode } from "react";
import { BlockWrapper } from "@/components/notion/blocks/layout";

export function Divider() {
  return <hr className="my-6 border-separator border-t" />;
}

// Notion's breadcrumb requires page-parent lookups we don't perform;
// render nothing rather than an empty stub.
export function Breadcrumb() {
  return null;
}

// Real TOC generation needs heading anchors across the whole page,
// which the block renderer doesn't have access to. Placeholder for now.
export function TableOfContents() {
  return (
    <BlockWrapper className="my-2 rounded-sm border border-separator bg-surface p-4 text-ink-secondary text-sm">
      目录（暂不支持自动生成）
    </BlockWrapper>
  );
}

export function ChildPage({
  title,
}: {
  title: ChildPageBlockObjectResponse["child_page"]["title"];
}) {
  return (
    <BlockWrapper className="my-2">
      <span className="break-all">
        📄&nbsp;{title}
        <span className="text-ink-secondary text-sm">
          （子页面，暂不支持渲染）
        </span>
      </span>
    </BlockWrapper>
  );
}

export function ChildDatabase({
  title,
}: {
  title: ChildDatabaseBlockObjectResponse["child_database"]["title"];
}) {
  return (
    <BlockWrapper className="my-2">
      <span className="break-all">
        🗂&nbsp;{title}
        <span className="text-ink-secondary text-sm">
          （子数据库，暂不支持渲染）
        </span>
      </span>
    </BlockWrapper>
  );
}

export function LinkToPage({
  target,
}: {
  target: LinkToPageBlockObjectResponse["link_to_page"];
}) {
  const id =
    target.type === "page_id"
      ? target.page_id
      : target.type === "database_id"
        ? target.database_id
        : target.comment_id;
  return (
    <BlockWrapper className="my-2">
      <a
        href={`https://www.notion.so/${id.replaceAll("-", "")}`}
        target="_blank"
        rel="noreferrer"
        className="underline transition-colors hover:text-accent-strong"
      >
        页面链接
      </a>
    </BlockWrapper>
  );
}

// Blocks synced from another block: children were fetched by the data
// layer, so render them directly.
export function SyncedBlock({ children }: { children?: ReactNode }) {
  return <BlockWrapper>{children}</BlockWrapper>;
}

export function Tab() {
  return <UnsupportedNotice />;
}

export function Template() {
  return <UnsupportedNotice />;
}

export function MeetingNotes() {
  return <UnsupportedNotice />;
}

function UnsupportedNotice() {
  return (
    <div className="my-2 rounded-sm border border-separator bg-surface p-2 text-ink-secondary text-sm">
      此内容类型暂不支持渲染
    </div>
  );
}
