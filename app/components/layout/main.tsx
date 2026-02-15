import type {PropsWithChildren} from 'react'

export const Main = (props : PropsWithChildren) => {
    return (
        <main className="main">
            {props.children}
        </main>
    )
}
