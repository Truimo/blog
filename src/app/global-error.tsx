"use client";

import { useEffect } from "react";
import { blogName } from "@/lib/site-info";

// global-error replaces the root layout, so global CSS is unavailable.
// Inline styles (with a manual prefers-color-scheme switch) keep the
// site's flat look consistent.
const styles = `
  :root { color-scheme: light dark; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
      "Noto Sans SC", "Helvetica Neue", Arial, sans-serif;
    background-color: #f5f5f7;
    color: #1d1d1f;
  }
  .card {
    text-align: center;
    padding: 0 1rem;
  }
  .title {
    font-size: 3.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
    color: #6e6e73;
  }
  .message {
    margin: 1rem 0 0;
    color: #6e6e73;
    word-break: break-all;
  }
  .digest { font-size: 0.85em; opacity: 0.8; }
  .retry {
    margin-top: 2rem;
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: #1d1d1f;
    background: none;
    border: 1px solid #d2d2d7;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
  }
  .retry:hover {
    border-color: #0ea5e9;
    color: #0284c7;
  }
  @media (prefers-color-scheme: dark) {
    body { background-color: #0a0a0a; color: #f5f5f7; }
    .title { color: #a1a1a6; }
    .message { color: #a1a1a6; }
    .retry { color: #f5f5f7; border-color: #38383a; }
    .retry:hover { border-color: #38bdf8; color: #38bdf8; }
  }
`;

export default function GlobalError({
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
    // global-error must include html and body tags
    <html lang="zh-CN">
      <body>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: scoped static styles for the fallback document */}
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div className="card">
          <p className="title">出错了</p>
          <p className="message">
            页面渲染出错，请稍后重试。
            {error.digest ? (
              <span className="digest"> ({error.digest})</span>
            ) : null}
          </p>
          <button type="button" className="retry" onClick={retry}>
            重试
          </button>
          <p className="message">
            <a className="retry" href="/">
              返回首页 - {blogName}
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
