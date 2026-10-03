import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import { CodeHighlighter } from "@/components/client/code-highlighter";
import { Mermaid } from "@/components/client/mermaid";
import { BlockWrapper, InlineBlock } from "@/components/notion/blocks/layout";
import { RichText } from "@/components/notion/rich-text";

export function Code({ block }: { block: CodeBlockObjectResponse }) {
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
