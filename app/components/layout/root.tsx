import type {PropsWithChildren} from 'react'
import {Fragment} from 'react'
import {Header} from './header'
import {Footer} from './footer'
import {Main} from './main'

export const Root = (props: PropsWithChildren) => {
    return (
        <Fragment>
            <Header/>
            <Main>{props.children}</Main>
            <Footer/>
        </Fragment>
    )
}
