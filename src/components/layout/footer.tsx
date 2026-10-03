import Link from "next/link";
import { Suspense } from "react";
import { blogName, icp } from "@/lib/site-info";

const CurrentYear = async () => {
  "use cache";
  return <>{new Date().getFullYear()}</>;
};

export const Footer = () => {
  return (
    <footer className="border-separator border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-6 text-center text-ink-secondary text-sm">
        <p>
          Copyright&nbsp;&copy;&nbsp;2019&nbsp;-&nbsp;
          <Suspense fallback={null}>
            <CurrentYear />
          </Suspense>
          &nbsp;
          <Link className="transition-colors hover:text-accent" href="/">
            {blogName}
          </Link>
        </p>
        {icp && (
          <p>
            <a
              className="transition-colors hover:text-accent"
              href="https://beian.miit.gov.cn/"
              rel="nofollow noreferrer"
              target="_blank"
            >
              {icp}
            </a>
          </p>
        )}
        <p>
          Powered by{" "}
          <a
            className="transition-colors hover:text-accent"
            href="https://github.com/Truimo/blog"
            rel="noreferrer"
            target="_blank"
          >
            Truimo/blog
          </a>
        </p>
      </div>
    </footer>
  );
};
