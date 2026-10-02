import Link from "next/link";
import { blogName } from "@/lib/site-info";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-separator border-b bg-canvas">
      <nav
        className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4"
        aria-label="主导航"
      >
        <Link
          className="font-semibold text-base tracking-tight"
          href="/"
          title={blogName}
        >
          {blogName}
        </Link>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link
              className="text-ink-secondary transition-colors hover:text-accent"
              href="/friends"
              title="Friends"
            >
              友链
            </Link>
          </li>
          <li>
            <a
              className="text-ink-secondary transition-colors hover:text-accent"
              href="https://www.truimo.com/about"
              title="About"
              target="_blank"
              rel="noopener noreferrer"
            >
              关于
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
