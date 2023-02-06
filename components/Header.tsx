import dropDownIcon from "../public/icon/drop-down.svg";
import dropDownLightIcon from "../public/icon/drop-down-light.svg";
import {Menu} from "@headlessui/react"
import Link from "next/link"
import Image from "next/image";

function Header() {

    const links = [
        ['#', '关于'],
        ['#', '归档'],
        ['#', '标签'],
        ['/friends', '友链'],
    ]

    return (
        <header
            className="sticky top-0 z-50 border-b border-b-gray-100 backdrop-blur bg-white/60 dark:bg-black/60 dark:border-b-gray-900">
            <div className="flex justify-between items-center">
                <div className="mx-6 my-3 font-bold">
                    <Link href="/">浅小沫的博客</Link>
                </div>
                <div className="relative">
                    <nav className="font-bold hidden sm:block">
                        <ul className="flex items-center">
                            {links.map(([href, name]) => (
                                <li className="mx-3" key={name}>
                                    {href.startsWith('/') ? (
                                        <Link href="/friends">友链</Link>
                                    ) : (
                                        <a href={href}>{name}</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="relative block sm:hidden">
                        <Menu>
                            <Menu.Button className="flex items-center">
                                <div className="px-3">
                                    <div className="hidden dark:block">
                                        <Image src={dropDownLightIcon} alt="drop down" width={26} height={26}/>
                                    </div>
                                    <div className="block dark:hidden">
                                        <Image src={dropDownIcon} alt="drop down" width={26} height={26}/>
                                    </div>
                                </div>
                            </Menu.Button>
                            <Menu.Items className="absolute right-1 w-32 mt-1 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded">
                                {links.map(([href, name]) => (
                                    <Menu.Item key={name}>
                                        <div className="py-2 px-3">
                                            {href.startsWith('/') ? (
                                                <Link href={href}>{name}</Link>
                                            ) : (
                                                <a href={href}>{name}</a>
                                            )}
                                        </div>
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
