import type {PropsWithChildren} from 'react'


export default function Content({children}: PropsWithChildren) {
    return (
        <main className="main">
            {children}
        </main>
    )
}
