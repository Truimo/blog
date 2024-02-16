import Link from 'next/link'
import {blogName} from '@/config'
import {Container} from "@/components/layout/Container";

export const Header: Component = () => {
    return (
        <header>
            <Container as="nav" className="h-16 flex justify-between items-center">
                <div className="h-full mx-4 flex items-center">
                    <Link className="text-xl font-bold" href="/" title={blogName}>{blogName}</Link>
                </div>
                <ul className="h-full mx-4 text-lg flex items-center">
                    <li className="ms-4 h-full flex items-center">
                        <Link href="/friends" title="Friends">友链</Link>
                    </li>
                    <li className="ms-4 h-full flex items-center">
                        <Link href="https://www.truimo.com/about" title="About" target="_blank">关于</Link>
                    </li>
                </ul>
            </Container>
        </header>
    )
}
