"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

/**
 * Navigates back in browser history. Renders as a link to the site root so it
 * still does something useful before hydration or without JavaScript.
 */
export function BackButton({ label }: { label: string }) {
  const router = useRouter();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.history.length > 1) {
      event.preventDefault();
      router.back();
    }
  };

  return (
    <a
      href="/"
      onClick={onClick}
      className="cursor-pointer rounded-sm border border-separator px-4 py-2 text-ink text-sm transition-colors hover:border-accent hover:text-accent-strong"
    >
      {label}
    </a>
  );
}
