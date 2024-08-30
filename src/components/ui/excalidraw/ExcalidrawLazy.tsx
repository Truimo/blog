import dynamic from 'next/dynamic'
import {ExcalidrawLoading} from './ExcalidrawLoading'

export const DynamicExcalidraw = dynamic(() => import('@excalidraw/excalidraw').then(m => m.Excalidraw), {
        ssr: false,
        loading: () => (<ExcalidrawLoading text="Excalidraw 正在载入中..." />),
    },
);
