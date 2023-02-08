import {Head, Html, Main, NextScript} from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="zh-CN">
            <Head>
                <Script src="https://analyze.truimo.com/umami.js" strategy="lazyOnload"
                        data-website-id="e0b642ae-836d-4cf7-b1d7-30b8be34608a" data-domains="blog.truimo.com"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
