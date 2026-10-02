import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

export default function Table({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('table' !== block.type) {
        return null
    }
    return <table className="table-auto border-collapse w-full border border-neutral-400">
        <tbody>{children}</tbody>
    </table>
}
