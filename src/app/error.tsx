"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold tracking-tight text-ink-secondary">
        出错了
      </p>
      <p className="mt-4 text-ink-secondary">
        页面渲染出错，请稍后重试。{error.digest ? `(${error.digest})` : ""}
      </p>
      <button
        type="button"
        onClick={retry}
        className="mt-8 cursor-pointer rounded-sm border border-separator px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent-strong"
      >
        重试
      </button>
    </div>
  );
}
