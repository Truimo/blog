import type {PropsWithChildren} from 'react'
import {Header} from '@/components/layout/Header'
import {Footer} from '@/components/layout/Footer'
import {Main} from "@/components/layout/Main";

export const Root: Component<PropsWithChildren> = (props: PropsWithChildren) => {
    return (
        <>
            <Header/>
            <Main>{props.children}</Main>
            <Footer/>
        </>
    )
}
