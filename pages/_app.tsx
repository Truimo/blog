import "../styles/normalize.css";
import "../styles/globals.css";
import "katex/dist/katex.min.css";
import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from "next";
import type {AppProps} from "next/app";
import {ThemeProvider} from "next-themes";
import Head from "next/head";
import BlogLayout from '../components/layout/BlogLayout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App({Component, pageProps}: AppPropsWithLayout) {

    const getLayout = Component.getLayout ?? ((page: ReactElement) => <BlogLayout>{page}</BlogLayout>)

    return (
        <>
            <Head>
                <meta name="viewport"
                      content="width=device-width,initial-scale=1.0,maximum-scale=1.0,viewport-fit=cover,user-scalable=0"/>
                <title>浅小沫的博客</title>
                <link rel="shortcut icon" type="image/png" href="https://q1.qlogo.cn/g?b=qq&nk=3201719830&s=640"/>
            </Head>
            <ThemeProvider attribute="class">
                {getLayout(
                    <Component {...pageProps}/>
                )}
            </ThemeProvider>
        </>
    )
}

export default App
