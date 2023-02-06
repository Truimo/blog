import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

function Footer() {
    const thisYear = new Date().getFullYear()
    return (
        <footer className="relative text-xs text-neutral-500 dark:text-neutral-600 bg-neutral-100 dark:bg-neutral-800">
            <div className="px-6 pt-3 pb-5">
                <div className="flex flex-col">
                    <div className="flex justify-end">
                        <ThemeSwitch/>
                    </div>
                    <section className="leading-5">
                        <p>Powered by <a href="https://nextjs.org/" className="hover:underline" target="_blank" rel="nofollow noreferrer">NextJS</a>, <a href="https://tailwindcss.com/" className="hover:underline" target="_blank" rel="nofollow noreferrer">Tailwindcss</a>, <a href="https://developers.notion.com/" className="hover:underline" target="_blank" rel="nofollow noreferrer">Notion</a></p>
                        <p>Design & Build with 💖 by <a href="https://github.com/truimo/blog" className="hover:underline" target="_blank" rel="nofollow noreferrer">Truimo</a></p>
                        <div className="my-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                        <div className="flex justify-between flex-wrap">
                            <p>Copyright &copy; 2019-{thisYear} <Link href="/">浅小沫的博客</Link></p>
                            <p><a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh" className="hover:underline" target="_blank" rel="nofollow noreferrer">CC BY-NC-ND 4.0</a></p>
                        </div>
                        <p><a className="hover:underline" href="http://beian.miit.gov.cn/" rel="nofollow noreferrer" target="_blank">湘ICP备2020021033号-1</a></p>
                    </section>
                </div>
            </div>
        </footer>
    )
}

export default Footer
