"use client";

import { useEffect, useState } from "react";

interface BookmarkMeta {
  title?: string;
  description?: string;
  open_graph?: { description?: string };
}

/**
 * Fetches bookmark metadata (title/description) from the server endpoint on
 * the client and renders a Notion-style link card. Falls back to the raw URL
 * host while loading or when the request fails.
 */
export function BookmarkCard({
  url,
  endpoint,
}: {
  url: string;
  endpoint: string;
}) {
  const [meta, setMeta] = useState<BookmarkMeta | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
          signal: AbortSignal.timeout(3000),
        });
        if (!response.ok) return;
        if (cancelled) return;
        setMeta((await response.json()) as BookmarkMeta);
      } catch {
        // Keep the host fallback.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url, endpoint]);

  const host = getHost(url);
  const title = meta?.title ?? host;
  const description = meta?.description ?? meta?.open_graph?.description;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex rounded-sm border border-separator no-underline transition-colors hover:border-accent"
    >
      <div className="flex-[4] overflow-hidden px-3.5 pt-3 pb-3.5 text-left">
        <p className="mb-0.5 min-h-6 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-ink leading-5">
          {title}
        </p>
        {description && (
          <p className="h-8 overflow-hidden text-[12px] text-ink-secondary leading-4">
            {description}
          </p>
        )}
        <p className="mt-1.5 flex items-center gap-[3px] overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-ink-secondary leading-4">
          <span>{url}</span>
          <ExternalLinkIcon />
        </p>
      </div>
    </a>
  );
}

function getHost(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);
