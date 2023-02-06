import {Tab} from "@headlessui/react";
import {useTheme} from "next-themes";
import type {FC} from "react";
import {useState, useEffect} from "react";

const ThemeSwitch: FC = () => {
    const [mounted, setMounted] = useState<boolean>(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (false === mounted) {
        return <div></div>
    }

    const themes = {
        'system': 'Auto',
        'light': 'Light',
        'dark': 'Dark',
    }

    return (
        <Tab.Group defaultIndex={Object.keys(themes).indexOf(theme || 'system')}
                   onChange={index => setTheme(Object.keys(themes)[index])}>
            <Tab.List className="w-fit text-xs font-light rounded border border-slate-500">
                {Object.entries(themes).map(([key, value]) => (
                    <Tab
                        key={key}
                        className={`px-1.5 py-1 m-px rounded ${theme === key ? 'bg-neutral-200 dark:bg-neutral-700' : 'bg-neutral-100 dark:bg-neutral-800'} ${theme === key ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-500 dark:text-neutral-600'}`}
                    >
                        {value}
                    </Tab>
                ))}
            </Tab.List>
        </Tab.Group>
    )
}

export default ThemeSwitch
