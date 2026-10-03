import type { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import type { ReactNode } from "react";
import { BlockWrapper, InlineBlock } from "@/components/notion/blocks/layout";
import { RichText } from "@/components/notion/rich-text";

export function Quote({
  block,
  children,
}: {
  block: QuoteBlockObjectResponse;
  children?: ReactNode;
}) {
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
