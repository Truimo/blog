import type {
  BookmarkBlockObjectResponse,
  LinkPreviewBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints.js";
import { BookmarkCard } from "@/components/client/bookmark";
import { BlockWrapper, InlineBlock } from "@/components/notion/blocks/layout";
import { RichText } from "@/components/notion/rich-text";

export function Bookmark({ block }: { block: BookmarkBlockObjectResponse }) {
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

export function LinkPreview({
  block,
}: {
  block: LinkPreviewBlockObjectResponse;
}) {
  return (
    <BlockWrapper className="my-4">
      <BookmarkCard url={block.link_preview.url} endpoint="/api/bookmark" />
    </BlockWrapper>
  );
}
