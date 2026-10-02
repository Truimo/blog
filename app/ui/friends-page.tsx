import type { Handle } from 'remix/component'
import { Document } from './document.tsx'
import { friends, blogLink, blogName } from '../site-info.ts'
import type { Friend } from '../types.d.ts'

export function FriendsPage() {
  return () => (
    <Document title={`友链 - ${blogName}`} canonical={`${blogLink}/friends`}>
      <div class="select-none">
        <h1 class="mb-2 text-2xl md:text-3xl font-bold tracking-tight">朋友们</h1>
        <p class="mb-8 text-ink-secondary">海内存知己，天涯若比邻</p>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {friends.map((friend) => (
            <Item key={friend.link} friend={friend} />
          ))}
        </div>
      </div>
    </Document>
  )
}

function Item(handle: Handle<{ friend: Friend }>) {
  return () => {
    const { friend } = handle.props

    return (
      <a href={friend.link} target="_blank" rel="noopener noreferrer" class="block border border-separator rounded-sm bg-surface p-5 transition-colors hover:border-accent">
        <div class="flex flex-col items-center justify-between">
          <div class="mb-2">
            <img src={friend.avatar} alt={friend.name}
                 loading="lazy" referrerPolicy="no-referrer"
                 class="w-16 h-16 object-cover" />
          </div>
          <p class="px-1 text-base truncate w-full text-center">{friend.name}</p>
        </div>
      </a>
    )
  }
}
