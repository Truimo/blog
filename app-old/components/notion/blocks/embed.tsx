import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import type {PropsWithChildren} from 'react'
import NotSupported from './not-supported'
// import {ExcalidrawLazy} from './Excalidraw'

export default function Embed({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('embed' !== block.type) {
        return null
    }
    const embed = block.embed

    /** if (embed.url.startsWith('https://excalidraw.com/#json=')) {
        return <ExcalidrawLazy url={embed.url} />
    } **/

    return (
        <NotSupported />
    )
}
