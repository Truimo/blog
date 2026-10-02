import type { Metadata } from "next";
import { blogLink, blogName, friends } from "@/lib/site-info";
import type { Friend } from "@/types";

export const metadata: Metadata = {
  title: "友链",
  description: `${blogName} 的友情链接`,
  alternates: { canonical: `${blogLink}/friends` },
};

export default function FriendsPage() {
  return (
    <div className="select-none">
      <h1 className="mb-2 font-bold text-2xl tracking-tight md:text-3xl">
        朋友们
      </h1>
      <p className="mb-8 text-ink-secondary">海内存知己，天涯若比邻</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {friends.map((friend) => (
          <Item key={friend.link} friend={friend} />
        ))}
      </div>
    </div>
  );
}

function Item({ friend }: { friend: Friend }) {
  return (
    <a
      href={friend.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-sm border border-separator bg-surface p-5 transition-colors hover:border-accent"
    >
      <div className="flex flex-col items-center justify-between">
        <div className="mb-2">
          {/* biome-ignore lint/performance/noImgElement: external avatars from many hosts */}
          <img
            src={friend.avatar}
            alt={friend.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-16 w-16 object-cover"
          />
        </div>
        <p className="w-full truncate px-1 text-center text-base">
          {friend.name}
        </p>
      </div>
    </a>
  );
}
