import type {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints.js";
import type { ReactNode } from "react";
import { InlineBlock } from "@/components/notion/blocks/layout";
import { RichText } from "@/components/notion/rich-text";

export function BulletList({
  block,
  children,
}: {
  block: BulletedListItemBlockObjectResponse;
  children?: ReactNode;
}) {
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

const ROMAN = [
  [1000, "m"],
  [900, "cm"],
  [500, "d"],
  [400, "cd"],
  [100, "c"],
  [90, "xc"],
  [50, "l"],
  [40, "xl"],
  [10, "x"],
  [9, "ix"],
  [5, "v"],
  [4, "iv"],
  [1, "i"],
] as const;

function toRoman(n: number): string {
  let result = "";
  for (const [value, numeral] of ROMAN) {
    while (n >= value) {
      result += numeral;
      n -= value;
    }
  }
  return result;
}

/** Formats a 1-based index for a Notion numbered list item. */
export function formatOrder(
  index: number,
  format: "numbers" | "letters" | "roman",
): string {
  if (format === "roman") return toRoman(index);
  if (format === "letters") {
    // a, b, ... z, aa, ab ...
    let n = index;
    let result = "";
    while (n > 0) {
      const rem = (n - 1) % 26;
      result = String.fromCharCode(97 + rem) + result;
      n = Math.floor((n - 1) / 26);
    }
    return result;
  }
  return String(index);
}

export function NumberList({
  block,
  order,
  children,
}: {
  block: NumberedListItemBlockObjectResponse;
  order: number;
  children?: ReactNode;
}) {
  const item = block.numbered_list_item;
  const start = item.list_start_index ?? 1;
  const format = item.list_format ?? "numbers";
  return (
    <>
      <InlineBlock color={item.color}>
        <span className="font-bold">
          &nbsp;{formatOrder(order + start, format)}.&nbsp;
        </span>
        <RichText rich_text={item.rich_text} />
      </InlineBlock>
      <div className="pl-[1em]">{children}</div>
    </>
  );
}
