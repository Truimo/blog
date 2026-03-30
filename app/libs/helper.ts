import type {ClassValue} from 'clsx'
import clsx from 'clsx'
import {twMerge} from 'tailwind-merge'

export const clsxm = (...args: ClassValue[]): string => {
    return twMerge(clsx(args))
}
