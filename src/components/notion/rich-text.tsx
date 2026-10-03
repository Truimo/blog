import type {
  EquationRichTextItemResponse,
  MentionRichTextItemResponse,
  RichTextItemResponse,
  RichTextItemResponseCommon,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints.js";
import katex from "katex";
import { textAnnotationClasses, textColorClass } from "@/lib/colors";
import { clsxm } from "@/lib/utils";

export function RichText({ rich_text }: { rich_text: RichTextItemResponse[] }) {
  return (
    <>
      {rich_text.map((item, idx) => {
        if (item.type === "text") {
          // biome-ignore lint/suspicious/noArrayIndexKey: stable ordered rich text
          return <Text key={idx} text={item} />;
        }
        if (item.type === "equation") {
          // biome-ignore lint/suspicious/noArrayIndexKey: stable ordered rich text
          return <InlineEquation key={idx} equation={item} />;
        }
        // biome-ignore lint/suspicious/noArrayIndexKey: stable ordered rich text
        return <Mention key={idx} mention={item} />;
      })}
    </>
  );
}

function Text({
  text,
}: {
  text: TextRichTextItemResponse & RichTextItemResponseCommon;
}) {
  const cls = clsxm(
    textAnnotationClasses(text.annotations),
    textColorClass(text.annotations),
  );

  if (text.text.link) {
    return (
      <a
        className={clsxm(cls, "underline")}
        href={text.text.link.url}
        rel="noreferrer"
        target="_blank"
      >
        {text.text.content}
      </a>
    );
  }

  return <span className={cls}>{text.text.content}</span>;
}

function Mention({
  mention,
}: {
  mention: MentionRichTextItemResponse & RichTextItemResponseCommon;
}) {
  const m = mention.mention;
  const cls = clsxm(
    textAnnotationClasses(mention.annotations),
    textColorClass(mention.annotations),
  );

  if (m.type === "custom_emoji") {
    return (
      // biome-ignore lint/performance/noImgElement: tiny inline custom emoji
      <img
        className="inline-block h-em object-cover"
        src={m.custom_emoji.url}
        alt={m.custom_emoji.name}
        referrerPolicy="no-referrer"
      />
    );
  }

  // All other mentions (user/date/page/database/link_preview/…) carry a
  // plain_text fallback; link it when an href exists.
  if (mention.href) {
    return (
      <a
        className={clsxm(cls, "underline")}
        href={mention.href}
        rel="noreferrer"
      >
        {mention.plain_text}
      </a>
    );
  }
  return <span className={cls}>{mention.plain_text}</span>;
}

function InlineEquation({
  equation,
}: {
  equation: EquationRichTextItemResponse & RichTextItemResponseCommon;
}) {
  let html: string;
  try {
    html = katex.renderToString(equation.equation.expression, {
      throwOnError: false,
      displayMode: false,
      strict: "ignore",
    });
  } catch {
    html = equation.equation.expression;
  }
  return (
    <span
      className={textColorClass(equation.annotations)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: katex-generated markup
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
