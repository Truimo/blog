import type {PropsWithChildren} from "react";
import {clsxm} from "@/libs/helper";

interface ContainerProps extends PropsWithChildren {
    as?: keyof JSX.IntrinsicElements | Component
    className?: string
}

export const Container: Component<ContainerProps> = (props: ContainerProps) => {
    const {as: Component = 'div', className, children} = props
    return (
        <Component className={clsxm('container max-w-6xl mx-auto', className)}>
            {children}
        </Component>
    )
}
