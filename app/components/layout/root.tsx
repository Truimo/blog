import type {PropsWithChildren} from 'react'
import {Header} from './header'
import {Footer} from './footer'
import {Main} from './main'

export const Root = ({children}: PropsWithChildren) => {
    return (
        <>
            <Header/>
            <Main>{children}</Main>
            <Footer/>
        </>
    )
}
