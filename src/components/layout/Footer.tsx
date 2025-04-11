import Link from 'next/link'
import {icp} from '@/config'
import {Container} from '@/components/layout/Container'

export const Footer: Component = () => {
    return (
        <footer>
            <Container className="h-16 flex justify-center items-center">
                <p className="text-center text-sm text-zinc-500">Copyright&nbsp;&copy;&nbsp;2019&nbsp;-&nbsp;2025&nbsp;<Link href="/">Truimo's Blog</Link>.&nbsp;
                    {icp && (<a href="http://beian.miit.gov.cn/" rel="nofollow noreferrer" target="_blank">{icp}</a>)}</p>
            </Container>
        </footer>
    )
}
