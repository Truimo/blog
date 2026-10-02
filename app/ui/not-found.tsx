import type { Handle } from 'remix/component'
import { Document } from './document.tsx'
import { blogName } from '../site-info.ts'

export function NotFoundPage(handle: Handle) {
    return () => (
        <Document title={`404 - ${blogName}`} description="页面未找到">
            <div class="min-h-[50vh] flex flex-col items-center justify-center text-center">
                <p class="text-6xl font-bold tracking-tight text-ink-secondary">404</p>
                <p class="mt-4 text-ink-secondary">你要找的页面不存在或已被移动。</p>
                <a class="mt-8 px-4 py-2 text-sm border border-separator rounded-sm text-ink hover:text-accent-strong hover:border-accent transition-colors" href="/">返回首页</a>
            </div>
        </Document>
    )
}
