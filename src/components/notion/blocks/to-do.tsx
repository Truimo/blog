import type { ToDoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import { InlineBlock } from "@/components/notion/blocks/layout";
import { RichText } from "@/components/notion/rich-text";

export function ToDo({ block }: { block: ToDoBlockObjectResponse }) {
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
