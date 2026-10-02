import type { RichTextItemResponseCommon } from "@notionhq/client/build/src/api-endpoints.js";
import { clsxm } from "@/lib/utils";

/**
 * Maps a Notion block/annotation color name to a CSS class defined in
 * globals.css. Classes carry both light and dark (prefers-color-scheme)
 * values, so colors stay correct without inline media queries.
 */
export function colorClass(color?: string): string | undefined {
  const key = color ?? "current";
  if (key === "current" || key === "default") return undefined;
  return `notion-${key.replace(/_/g, "-")}`;
}

export function textAnnotationClasses(
  annotations: RichTextItemResponseCommon["annotations"],
): string {
  const classes: string[] = [];
  if (annotations.bold) classes.push("font-bold");
  if (annotations.italic) classes.push("italic");
  if (annotations.strikethrough) classes.push("line-through");
  if (annotations.underline) classes.push("underline");
  if (annotations.code) classes.push("font-mono", "notion-code");
  return clsxm(classes);
}

export function textColorClass(
  annotations: RichTextItemResponseCommon["annotations"],
): string | undefined {
  if (annotations.color) {
    return colorClass(annotations.color);
  }
  return undefined;
}

/** Maps a Notion tag color name to a tag badge class. */
export function tagColorClass(color: string): string {
  return `tag-${color}`;
}
