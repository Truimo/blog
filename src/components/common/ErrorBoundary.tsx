'use client'

import type { PropsWithChildren } from 'react'
import { ErrorBoundary as ErrorBoundaryLib } from 'react-error-boundary'

const FallbackComponent = () => {
    return (
        <div className="center flex w-full flex-col py-6">
            Something went wrong. Please contract to{' '}
            <a href="mailto:i@innei.in" className="shiro-link--underline">
                i@innei.in
            </a>
            .
        </div>
    )
}
export const ErrorBoundary = (props: PropsWithChildren) => {
    return (
        <ErrorBoundaryLib
            FallbackComponent={FallbackComponent}
            onError={(err) => {
                console.error('ErrorBoundary', err)
            }}
        >{props.children}</ErrorBoundaryLib>
    )
}
