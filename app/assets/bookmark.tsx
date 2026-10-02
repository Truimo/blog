import { clientEntry, css, type Handle, type SerializableValue } from 'remix/component'

export interface BookmarkCardProps {
    url: string
    endpoint: string
    [key: string]: SerializableValue
}

interface BookmarkMeta {
    title?: string
    description?: string
    open_graph?: { description?: string }
}

const bookmarkCss = css({
    display: 'flex',
    border: '1px solid var(--color-separator)',
    borderRadius: '4px',
    textDecoration: 'none',
    ':hover': {
        borderColor: 'var(--color-accent)',
    },
})

const infoCss = css({
    padding: '12px 14px 14px',
    flex: '4',
    textAlign: 'left',
    overflow: 'hidden',
})

const titleCss = css({
    fontSize: '14px',
    lineHeight: '20px',
    minHeight: '24px',
    marginBottom: '2px',
    color: 'var(--color-ink)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
})

const descriptionCss = css({
    fontSize: '12px',
    lineHeight: '16px',
    height: '32px',
    color: 'var(--color-ink-secondary)',
    overflow: 'hidden',
})

const linkCss = css({
    fontSize: '12px',
    lineHeight: '16px',
    marginTop: '6px',
    color: 'var(--color-ink-secondary)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
})

/**
 * Fetches bookmark metadata (title/description) from the server endpoint on
 * the client and renders a Notion-style link card. Falls back to the raw URL
 * host while loading or when the request fails.
 */
export const BookmarkCard = clientEntry<BookmarkCardProps>(
    import.meta.url + '#BookmarkCard',
    function BookmarkCard(handle: Handle<BookmarkCardProps>) {
        let meta: BookmarkMeta | null = null
        let requestedUrl: string | null = null

        return () => {
            const { url, endpoint } = handle.props

            if (requestedUrl !== url) {
                requestedUrl = url
                meta = null

                handle.queueTask(async (signal) => {
                    try {
                        const response = await fetch(endpoint, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url }),
                            signal: AbortSignal.timeout(3000),
                        })
                        if (!response.ok) return
                        if (signal.aborted || requestedUrl !== url) return
                        meta = (await response.json()) as BookmarkMeta
                    } catch {
                        return
                    }
                    if (!signal.aborted && requestedUrl === url) {
                        handle.update()
                    }
                })
            }

            const host = getHost(url)
            const title = meta?.title ?? host
            const description = meta?.description ?? meta?.open_graph?.description

            return (
                <a mix={bookmarkCss} href={url} role="link" target="_blank" rel="noopener noreferrer">
                    <div mix={infoCss}>
                        <p mix={titleCss}>{title}</p>
                        {description && <p mix={descriptionCss}>{description}</p>}
                        <p mix={linkCss}>
                            <span>{url}</span>
                            <ExternalLinkIcon />
                        </p>
                    </div>
                </a>
            )
        }
    },
)

function getHost(url: string): string {
    try {
        return new URL(url).hostname
    } catch {
        return url
    }
}

const ExternalLinkIcon = () => {
    return () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
    )
}
