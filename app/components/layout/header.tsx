import {Link} from 'react-router'
import {blogName} from '~/site-info'
import {Container} from './container'

export const Header = () => {
    return (
        <header>
            <Container as="nav" className="h-16 flex justify-between items-center">
                <div className="h-full mx-4 flex items-center">
                    <Link className="text-xl font-bold" to="/" title={blogName}>{blogName}</Link>
                </div>
                <ul className="h-full mx-4 text-lg flex items-center">
                    <li className="ms-4 h-full flex items-center">
                        <Link to="/friends" title="Friends">友链</Link>
                    </li>
                    <li className="ms-4 h-full flex items-center">
                        <Link to="https://www.truimo.com/about" title="About" target="_blank">关于</Link>
                    </li>
                </ul>
            </Container>
        </header>
    )
}
