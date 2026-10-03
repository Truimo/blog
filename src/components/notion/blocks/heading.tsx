import type { Heading1BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import type { ReactNode } from "react";
import { RichText } from "@/components/notion/rich-text";
import { colorClass } from "@/lib/colors";
import { clsxm } from "@/lib/utils";

interface HeadingContent {
  rich_text: Heading1BlockObjectResponse["heading_1"]["rich_text"];
  color: Heading1BlockObjectResponse["heading_1"]["color"];
  is_toggleable: boolean;
}

/**
 * Headings keep their semantic h* tag (demoted one level since the post
 * title already provides the page h1). Toggleable headings wrap the h*
 * inside <details>/<summary> so nested children can collapse.
 */
export function Heading({
  content,
  level,
  children,
}: {
  content: HeadingContent;
  level: 1 | 2 | 3 | 4;
  children?: ReactNode;
}) {
  const Tag = `h${level + 1}` as const as "h2" | "h3" | "h4" | "h5";
  const sizeClass = {
    1: "mt-6 mb-2 py-1 font-bold text-2xl leading-snug tracking-tight md:text-3xl",
    2: "mt-6 mb-2 py-1 font-semibold text-xl leading-snug tracking-tight md:text-2xl",
    3: "mt-5 mb-1 py-1 font-semibold text-lg leading-snug md:text-xl",
    4: "mt-4 mb-1 py-1 font-semibold text-base leading-snug md:text-lg",
  }[level];
  const heading = (
    <Tag className={clsxm(sizeClass, colorClass(content.color))}>
      <RichText rich_text={content.rich_text} />
    </Tag>
  );

  if (!content.is_toggleable) {
    return (
      <>
        {heading}
        {children}
      </>
    );
  }
  return (
    <details className="my-1">
      <summary className="cursor-pointer">{heading}</summary>
      {children}
    </details>
  );
}
