import {Link} from 'react-router'
import {icp} from '~/site-info'
import {Container} from './container'

export const Footer = () => {
    return (
        <footer>
            <Container className="h-16 flex justify-center items-center">
                <p className="text-center text-sm text-zinc-500">Copyright&nbsp;&copy;&nbsp;2019&nbsp;-&nbsp;2026&nbsp;<Link to="/">Truimo&apos;s Blog</Link>.&nbsp;
                    {icp && (<a href="http://beian.miit.gov.cn/" rel="nofollow noreferrer" target="_blank">{icp}</a>)}</p>
            </Container>
        </footer>
    )
}
