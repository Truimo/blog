import type {PropsWithChildren} from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {Main} from "@/components/layout/Main";

export default function Root({children}: PropsWithChildren) {
    return (
        <>
            <Header/>
            <Main>{children}</Main>
            <Footer/>
        </>
    )
}
