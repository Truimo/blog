import type { EquationBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import katex from "katex";
import { BlockWrapper } from "@/components/notion/blocks/layout";

export function EquationBlock({
  block,
}: {
  block: EquationBlockObjectResponse;
}) {
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
