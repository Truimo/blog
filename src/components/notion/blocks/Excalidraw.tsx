import { Block } from '@/components/notion/blocks/Block'
import { Excalidraw } from '@/components/ui/excalidraw'
import { ExcalidrawWrapper } from '@/components/notion/styles/Excalidraw'

export const ExcalidrawLazy = ({ url }: {
    url: string
}) => {
    return (
        <Block>
            <ExcalidrawWrapper>
                <Excalidraw url={url} />
            </ExcalidrawWrapper>
        </Block>
    )
}
