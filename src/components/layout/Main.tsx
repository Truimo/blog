import type {PropsWithChildren} from 'react'

export const Main: Component<PropsWithChildren> = (props : PropsWithChildren) => {
    return (
        <main className="main">
            {props.children}
        </main>
    )
}
