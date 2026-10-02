import { clientEntry, on, type Handle, type SerializableValue } from 'remix/component'

export interface BackButtonProps {
    label: string
    [key: string]: SerializableValue
}

/**
 * Navigates back in browser history. Renders as a link to the site root so it
 * still does something useful before hydration or without JavaScript.
 */
export const BackButton = clientEntry<BackButtonProps>(
    import.meta.url + '#BackButton',
    function BackButton(handle: Handle<BackButtonProps>) {
        return () => (
            <a
                href="/"
                class="px-4 py-2 text-sm border border-separator rounded-sm text-ink hover:text-accent-strong hover:border-accent transition-colors cursor-pointer"
                mix={on('click', (event) => {
                    if (history.length > 1) {
                        event.preventDefault()
                        history.back()
                    }
                })}
            >
                {handle.props.label}
            </a>
        )
    },
)
