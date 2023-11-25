'use client'

import { useEffect } from 'react'

export default function Page({ error, reset }: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        console.log('error', error)
    }, [error])

    return (
        <div className="fill flex flex-col justify-center items-center">
            <h2 className="mb-5">Something went wrong!</h2>
        </div>
    )
}
