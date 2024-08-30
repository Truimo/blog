import {Block} from '@/components/notion/blocks/Block'
import {Excalidraw} from '@/components/ui/excalidraw'

import styles from '../styles/Excalidraw.module.css'
import clsx from 'clsx'


export const ExcalidrawLazy = ({url}: {
    url: string
}) => {
    return (
        <Block className={styles['excalidraw-wrapper']} >
            <Excalidraw url={url}/>
        </Block>
    )
}
