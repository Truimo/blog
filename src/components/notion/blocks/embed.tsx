import type { EmbedBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";

// Excalidraw 等服务端渲染嵌入的后续落点；当前显示占位链接。
export function Embed({ block }: { block: EmbedBlockObjectResponse }) {
  return (
    <a
      href={block.embed.url}
      target="_blank"
      rel="noreferrer"
      className="my-2 block break-all rounded-sm border border-separator bg-surface p-2 text-ink-secondary text-sm transition-colors hover:border-accent hover:text-accent-strong"
    >
      Embed: {block.embed.url}
    </a>
  );
}
