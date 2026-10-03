import type { PageIconResponse } from "@notionhq/client/build/src/api-endpoints.js";

const NOTION_ICONS_PREFIX = "https://www.notion.so/icons/";

function imgNode(src: string, srcSetDark?: string) {
  if (srcSetDark) {
    return (
      <picture>
        <source
          media="(prefers-color-scheme: dark)"
          srcSet={srcSetDark}
          type="image/svg+xml"
        />
        <img
          className="inline-block h-em object-cover"
          src={src}
          alt=""
          referrerPolicy="no-referrer"
        />
      </picture>
    );
  }
  return (
    // biome-ignore lint/performance/noImgElement: tiny notion icon without dimensions
    <img
      className="inline-block h-em object-cover"
      src={src}
      alt=""
      referrerPolicy="no-referrer"
    />
  );
}

/**
 * Renders any Notion page icon (emoji, file, external URL, custom emoji or
 * built-in "noticon"). Noticons switch fill colors via ?mode=light/dark,
 * so they get a <picture> with a dark-scheme source to stay readable in
 * the site's prefers-color-scheme dark mode.
 */
export function Icon({ icon }: { icon: PageIconResponse }) {
  switch (icon.type) {
    case "emoji":
      return <span>{icon.emoji}</span>;
    case "icon": {
      const file = `${icon.icon.name}_${icon.icon.color}.svg`;
      return imgNode(
        `/api/notion/icons/${file}?mode=light`,
        `/api/notion/icons/${file}?mode=dark`,
      );
    }
    case "external": {
      const link = icon.external.url.startsWith(NOTION_ICONS_PREFIX)
        ? `/api/notion/icons/${icon.external.url.slice(NOTION_ICONS_PREFIX.length)}`
        : icon.external.url;
      return imgNode(link);
    }
    case "file":
      return imgNode(icon.file.url);
    case "custom_emoji":
      return imgNode(icon.custom_emoji.url);
    default:
      return null;
  }
}
