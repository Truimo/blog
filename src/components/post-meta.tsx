import { CopyLinkButton } from "@/components/client/copy-link";
import { Signature } from "@/components/signature";
import { colorClass, tagColorClass } from "@/lib/colors";
import { blogLink } from "@/lib/site-info";
import { formatDate } from "@/lib/time";
import { clsxm } from "@/lib/utils";
import type { Category as CategoryType, Tag } from "@/types";

export function Time({ datetime }: { datetime: string }) {
  const dateStr = formatDate(datetime, "YYYY[ 年 ]MM[ 月 ]DD[ 日 ]");
  return <time dateTime={datetime}>{dateStr}</time>;
}

export function Category({ category }: { category: CategoryType }) {
  return (
    <span className={colorClass(category.color) ?? "text-ink"}>
      {category.name}
    </span>
  );
}

export function Tags({ tags, className }: { tags: Tag[]; className?: string }) {
  if (tags.length === 0) {
    return <span className={clsxm(className, "tag-default")}>无标签</span>;
  }
  return (
    <>
      {tags.map((tag) => (
        <span
          key={tag.name}
          className={clsxm(className, tagColorClass(tag.color))}
        >
          {tag.name}
        </span>
      ))}
    </>
  );
}

export function PostCopyright({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const link = `${blogLink}/posts/${slug}`;
  return (
    <section className="mt-10 border-separator border-t pt-6 text-ink-secondary text-sm leading-loose">
      <p>文章标题：{title}</p>
      <p>文章作者：浅小沫</p>
      <p>
        <span>文章链接：{link}</span> <CopyLinkButton link={link} />
      </p>
      <div>
        <div className="signature print:hidden">
          <Signature />
        </div>
        <div>
          <p>
            您可以自由在任何媒介以任何形式分享本作品，但需署名，且不得用于商业目的或改编。若分发衍生作品，须采用相同的许可协议。
          </p>
          <p>
            <span>本博客的所有原创内容采用 </span>
            <a
              className="underline transition-colors hover:text-accent-strong"
              href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY-NC-ND 4.0 知识共享署名-非商业性使用-禁止演绎 4.0
              国际许可协议
            </a>
            <span> 进行许可。</span>
          </p>
        </div>
      </div>
    </section>
  );
}
