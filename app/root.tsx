import type {ReactNode} from 'react'
import {isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration} from 'react-router'

import type {Route} from './+types/root'
import {blogDescription, blogName} from './site-info'
import {ReactQueryProvider} from './providers/react-query-provider'
import {Root} from './components/layout/root'

import './styles/index.css'

export const links: Route.LinksFunction = () => [
    {
        rel: "preconnect", href: "https://fonts.googleapis.com"
    },
    {
        rel: "canonical", href: "https://blog.truimo.com"
    },
    {
        rel: "icon", href: "https://assets.truimo.com/avatars/min.png", type: "image/png", sizes: "500x500"
    }
]

export const meta: Route.MetaFunction = () => [
    {
        title: blogName
    }, {
        name: 'description',
        content: blogDescription
    }, {
        name: 'google-site-verification',
        content: 'GdFb_xYFw9Ait8bFcxGoIPoZwD1BfatxIpEXznZdpUE'
    }
]

export function Layout({children}: { children: ReactNode }) {
    return (
        <html lang="zh-CN">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <SayHi/>
        <ReactQueryProvider>
            <Root>
                {children}
            </Root>
        </ReactQueryProvider>
        <ScrollRestoration/>
        <Scripts/>
        <Analytics/>
        </body>
        </html>
    )
}

export default function App() {
    return <Outlet/>
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                  <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}


const SayHi = () => {
    return (
        <script dangerouslySetInnerHTML={{
            __html: 'console.log("%c Truimo\'s Blog %c https://github.com/Truimo/blog ", "color: #fff; margin: 1em 0; padding: 5px 0; background: #0ea5e9;", "margin: 1em 0; padding: 5px 0; background: #efefef;");'
        }}></script>
    )
}

const Analytics = () => {
    if (import.meta.env.PROD) {
        return (
            <script defer src="/_vercel/insights/script.js"></script>
        )
    }
    return null
}
