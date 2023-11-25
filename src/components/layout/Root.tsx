import type {PropsWithChildren} from 'react'
import Content from '@/components/layout/Content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Root({children}: PropsWithChildren) {
    return (
        <>
            <Header/>
            <Content>{children}</Content>
            <Footer/>
        </>
    )
}
