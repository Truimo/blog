import type { ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import type { ReactNode } from "react";
import { BlockWrapper } from "@/components/notion/blocks/layout";
import { RichText } from "@/components/notion/rich-text";

export function Toggle({
  block,
  children,
}: {
  block: ToggleBlockObjectResponse;
  children?: ReactNode;
}) {
  return (
    <details>
      <summary>
        <RichText rich_text={block.toggle.rich_text} />
      </summary>
      <BlockWrapper>{children}</BlockWrapper>
    </details>
  );
}
