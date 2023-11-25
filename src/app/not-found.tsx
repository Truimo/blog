import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="fill flex flex-col justify-center items-center">
            <div>
                <h2 className="leading-relaxed text-2xl">404 Not Found</h2>
                <p className="leading-relaxed">你访问的页面不存在</p>
                <Link href="/" className="leading-relaxed">返回首页</Link>
            </div>
        </div>
    )
}
