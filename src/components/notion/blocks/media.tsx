import type {
  AudioBlockObjectResponse,
  FileBlockObjectResponse,
  ImageBlockObjectResponse,
  PdfBlockObjectResponse,
  RichTextItemResponse,
  VideoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints.js";
import { BlockWrapper, InlineBlock } from "@/components/notion/blocks/layout";
import { RichText } from "@/components/notion/rich-text";

function Caption({ caption }: { caption: RichTextItemResponse[] }) {
  if (caption.length === 0) return null;
  return (
    <InlineBlock className="mt-1 text-ink-secondary text-sm">
      <RichText rich_text={caption} />
    </InlineBlock>
  );
}

export function Img({ block }: { block: ImageBlockObjectResponse }) {
  const img = block.image;
  const url =
    img.type === "external"
      ? img.external.url
      : `/api/notion/image/${block.id}`;
  const alt = img.caption.map((c) => c.plain_text).join("");
  return (
    <BlockWrapper className="my-4">
      <figure className="mx-auto w-fit max-w-full">
        {/* biome-ignore lint/performance/noImgElement: remote Notion images without dimensions */}
        <img
          src={url}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="block w-fit max-w-full object-cover"
        />
        {img.caption.length > 0 && (
          <figcaption className="break-words py-1 text-ink-secondary text-sm">
            <RichText rich_text={img.caption} />
          </figcaption>
        )}
      </figure>
    </BlockWrapper>
  );
}

export function Video({ block }: { block: VideoBlockObjectResponse }) {
  const video = block.video;
  const url =
    video.type === "external"
      ? video.external.url
      : `/api/notion/video/${block.id}`;
  return (
    <BlockWrapper className="my-4">
      <div className="mx-auto w-fit max-w-full">
        {/* biome-ignore lint/a11y/useMediaCaption: Notion videos have no caption tracks */}
        <video src={url} controls />
        <Caption caption={video.caption} />
      </div>
    </BlockWrapper>
  );
}

export function Audio({ block }: { block: AudioBlockObjectResponse }) {
  const audio = block.audio;
  const url =
    audio.type === "external"
      ? audio.external.url
      : `/api/notion/audio/${block.id}`;
  return (
    <BlockWrapper className="my-4">
      {/* biome-ignore lint/a11y/useMediaCaption: Notion audio has no caption tracks */}
      <audio src={url} controls className="w-full" />
      <Caption caption={audio.caption} />
    </BlockWrapper>
  );
}

/**
 * Renders file / pdf blocks as a plain download link. Notion's signed file
 * URLs expire (~1h), so internal files proxy through the audio API route
 * which re-resolves the block on demand. PDFs additionally link inline
 * for direct viewing.
 */
export function FileLike({
  block,
  kind,
}: {
  block: FileBlockObjectResponse | PdfBlockObjectResponse;
  kind: "file" | "pdf";
}) {
  const content =
    kind === "pdf"
      ? (block as PdfBlockObjectResponse).pdf
      : (block as FileBlockObjectResponse).file;
  const name =
    content.type === "external"
      ? content.external.url.split("/").pop() || "file"
      : ((content as { name?: string }).name ?? `${kind}`);
  const url =
    content.type === "external"
      ? content.external.url
      : `/api/notion/audio/${block.id}`;
  return (
    <BlockWrapper className="my-4">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-sm border border-separator px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent-strong"
      >
        <span aria-hidden="true">{kind === "pdf" ? "📄" : "📎"}</span>
        <span className="break-all">{name}</span>
      </a>
      <Caption caption={content.caption} />
    </BlockWrapper>
  );
}
