import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

export default function Divider({block}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('divider' !== block.type) {
        return null
    }
    return <hr className="my-3 border-b-4 border-gray-300"/>
}
