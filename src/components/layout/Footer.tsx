import Link from 'next/link'
import {icp} from '@/config'

export const Footer: Component = () => {
    return (
        <footer>
            <div className="h-16 max-w-6xl mx-auto flex justify-center items-center">
                <p className="text-center text-sm text-zinc-500">Copyright&nbsp;&copy;&nbsp;2019-2024&nbsp;<Link href="/">Truimo</Link>.&nbsp;<a href="#">Blog</a>.&nbsp;
                    {icp && (<a href="http://beian.miit.gov.cn/" rel="nofollow noreferrer" target="_blank">{icp}</a>)}</p>
            </div>
        </footer>
    )
}
