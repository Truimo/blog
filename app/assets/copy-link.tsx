import { clientEntry, on, type Handle, type SerializableValue } from 'remix/component'

export interface CopyLinkButtonProps {
    link: string
    [key: string]: SerializableValue
}

/**
 * Copies the post link to the clipboard and briefly shows a success label.
 */
export const CopyLinkButton = clientEntry<CopyLinkButtonProps>(
    import.meta.url + '#CopyLinkButton',
    function CopyLinkButton(handle: Handle<CopyLinkButtonProps>) {
        let copied = false

        return () => (
            <button
                type="button"
                class="cursor-pointer select-none print:hidden"
                mix={on('click', () => {
                    navigator.clipboard.writeText(handle.props.link).then(() => {
                        copied = true
                        handle.update()
                    })
                })}
            >
                {copied ? '[复制成功]' : '[复制]'}
            </button>
        )
    },
)
