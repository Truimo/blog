import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import type { ReactNode } from "react";
import { Icon } from "@/components/notion/blocks/icon";
import { InlineBlock } from "@/components/notion/blocks/layout";
import { RichText } from "@/components/notion/rich-text";

export function Paragraph({
  block,
  children,
}: {
  block: BlockObjectResponse;
  children?: ReactNode;
}) {
  if (block.type !== "paragraph") return null;
  return (
    <InlineBlock color={block.paragraph.color}>
      {block.paragraph.icon && (
        <>
          <Icon icon={block.paragraph.icon} />
          <span>&nbsp;</span>
        </>
      )}
      <RichText rich_text={block.paragraph.rich_text} />
      {children}
    </InlineBlock>
  );
}
