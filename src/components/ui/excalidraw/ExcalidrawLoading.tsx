export const ExcalidrawLoading: Component<{
    text: string
}> = ({text}) => {
    return (
        <div className="h-full w-full flex flex-col justify-center bg-slate-100">
            <div className="my-20 text-center">
                <span className="icon-[line-md--loading-twotone-loop] loading-lg w-10 h-10"></span>
                <p className="mt-6">{text}</p>
            </div>
        </div>
    )
}

export const ExcalidrawLoadError: Component = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center bg-slate-100">
            <div className="my-20 text-center">
                <p>Excalidraw 加载失败。</p>
            </div>
        </div>
    )
}
