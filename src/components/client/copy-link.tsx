"use client";

import { useState } from "react";

/**
 * Copies the post link to the clipboard and briefly shows a success label.
 */
export function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer select-none print:hidden"
    >
      {copied ? "[复制成功]" : "[复制]"}
    </button>
  );
}
