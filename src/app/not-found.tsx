import type { Metadata } from "next";
import { blogName } from "@/lib/site-info";

export const metadata: Metadata = {
  title: "404",
  description: "页面未找到",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="font-bold text-6xl text-ink-secondary tracking-tight">
        404
      </p>
      <p className="mt-4 text-ink-secondary">你要找的页面不存在或已被移动。</p>
      <a
        className="mt-8 rounded-sm border border-separator px-4 py-2 text-ink text-sm transition-colors hover:border-accent hover:text-accent-strong"
        href="/"
      >
        返回首页 - {blogName}
      </a>
    </div>
  );
}
