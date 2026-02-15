import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

export default function Column({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('column' !== block.type) {
        return null
    }
    return <section>{children}</section>
}
