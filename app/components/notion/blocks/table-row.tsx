import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import RichText from './rich-text'

export default function TableRow({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('table_row' !== block.type) {
        return null
    }
    const row = block.table_row
    return <tr>{row.cells.map((cell, idx) => {
            return <td key={idx} className="border border-neutral-300 p-3"><RichText rich_text={cell} /></td>
        })}
    </tr>
}
