import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from "next";
import type {AppProps} from "next/app";
import {ThemeProvider} from "next-themes";
import Head from "next/head";
import BlogLayout from '../components/layout/BlogLayout';
import "../styles/normalize.css";
import "../styles/globals.css";

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
                <link rel="icon" href="/favicon.ico"/>
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
