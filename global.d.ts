import type {FC, PropsWithChildren} from 'react'

declare global {
    export type NextErrorProps = {
        reset(): void
        error: Error
    }

    export type NextPageParams<P extends {}, Props = {}> = PropsWithChildren<
        {
            params: P
        } & Props
    >

    export type Component<P = {}> = FC<ComponentType & P>

    export type ComponentType<P = {}> = {
        className?: string
    } & PropsWithChildren & P
}

export {}
