import type { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import type { ReactNode } from "react";
import { Icon } from "@/components/notion/blocks/icon";
import { BlockWrapper, InlineBlock } from "@/components/notion/blocks/layout";
import { RichText } from "@/components/notion/rich-text";

export function Callout({
  block,
  children,
}: {
  block: CalloutBlockObjectResponse;
  children?: ReactNode;
}) {
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
