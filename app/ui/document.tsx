import type { Handle, RemixNode } from 'remix/component'
import { unsafeHTML } from 'remix/component'
import { ImportMap } from 'remix/component/server'
import { assetServer } from '../assets.ts'
import { routes } from '../routes.ts'
import { blogDescription, blogIcon, blogName, blogTitle, icp } from '../site-info.ts'

const isProduction = process.env.NODE_ENV === 'production'

const scriptEntry = await assetServer.getScriptEntry('app/assets/entry.ts')

export interface DocumentProps {
    children?: RemixNode
    head?: RemixNode
    title?: string
    description?: string
    canonical?: string
    image?: string
    type?: string
}

export function Document(handle: Handle<DocumentProps>) {
    return () => {
        const {
            children,
            head,
            title = blogTitle,
            description = blogDescription,
            canonical,
            image = blogIcon,
            type = 'website',
        } = handle.props

        return (
            <html lang="zh-CN">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="https://assets.truimo.com/avatars/min.png" type="image/png" sizes="500x500" />
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta name="google-site-verification" content="GdFb_xYFw9Ait8bFcxGoIPoZwD1BfatxIpEXznZdpUE" />
                    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f5f5f7" />
                    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a" />
                    {canonical && <link rel="canonical" href={canonical} />}
                    <meta property="og:site_name" content={blogName} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    {canonical && <meta property="og:url" content={canonical} />}
                    <meta property="og:type" content={type} />
                    {image && <meta property="og:image" content={image} />}
                    <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    {image && <meta name="twitter:image" content={image} />}
                    <link rel="stylesheet" href={routes.assets.href({ path: 'app/styles/build.css' })} />
                    <link rel="stylesheet" href={routes.assets.href({ path: 'node_modules/katex/dist/katex.min.css' })} />
                    <ImportMap value={scriptEntry.importMap} />
                    {scriptEntry.preloads.map((href) => (
                        <link key={href} rel="modulepreload" href={href} />
                    ))}
                    {head}
                </head>
                <body class="antialiased">
                    <Header />
                    <main class="main">
                        {children}
                    </main>
                    <Footer />
                    {isProduction && <Analytics />}
                    <SayHi />
                    <script type="module" src={scriptEntry.href}></script>
                </body>
            </html>
        )
    }
}

function Header() {
    return () => (
        <header class="sticky top-0 z-10 bg-canvas border-b border-separator">
            <nav class="max-w-6xl mx-auto h-12 px-4 flex justify-between items-center" aria-label="主导航">
                <a class="text-base font-semibold tracking-tight" href={routes.home.href()} title={blogName}>{blogName}</a>
                <ul class="flex items-center gap-6 text-sm">
                    <li>
                        <a class="text-ink-secondary hover:text-accent transition-colors" href={routes.friends.href()} title="Friends">友链</a>
                    </li>
                    <li>
                        <a class="text-ink-secondary hover:text-accent transition-colors" href="https://www.truimo.com/about" title="About" target="_blank" rel="noopener noreferrer">关于</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

function Footer() {
    return () => (
        <footer class="border-t border-separator">
            <div class="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center gap-1 text-center text-sm text-ink-secondary">
                <p>
                    Copyright&nbsp;&copy;&nbsp;2019&nbsp;-&nbsp;{new Date().getFullYear()}&nbsp;
                    <a class="hover:text-accent transition-colors" href={routes.home.href()}>{blogName}</a>
                </p>
                {icp && (
                    <p>
                        <a class="hover:text-accent transition-colors" href="https://beian.miit.gov.cn/" rel="nofollow noreferrer" target="_blank">{icp}</a>
                    </p>
                )}
            </div>
        </footer>
    )
}

const Analytics = () => {
    return () => <script defer src="/_vercel/insights/script.js"></script>
}

const SayHi = () => {
    return () => (
        <script
            innerHTML={unsafeHTML(
                'console.log("%c Truimo\'s Blog %c https://github.com/Truimo/blog ", "color: #fff; margin: 1em 0; padding: 5px 0; background: #0ea5e9;", "margin: 1em 0; padding: 5px 0; background: #efefef;");',
            )}
        ></script>
    )
}
