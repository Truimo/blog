import { css } from 'styled-system/css'

export const tagTextStyle = css({
    borderRadius: '3px',
    padding: '2px 6px',
    color: 'rgb(29, 27, 22)',
    backgroundColor: 'rgba(84, 72, 49, 0.08)',
    '@media (prefers-color-scheme: dark)': {
        color: 'rgb(211, 211, 211)',
        backgroundColor: 'rgba(255, 255, 255, 0.094)'
    }
})

export const colorVariants = {
    default: css({
        color: 'rgb(29, 27, 22)',
        backgroundColor: 'rgba(84, 72, 49, 0.08)',
        '@media (prefers-color-scheme: dark)': {
            color: 'rgb(211, 211, 211)',
            backgroundColor: 'rgba(255, 255, 255, 0.094)'
        }
    }),
    gray: css({
        color: 'rgb(29, 27, 22)',
        backgroundColor: 'rgba(84, 72, 49, 0.15)',
        '@media (prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.81)',
            backgroundColor: 'rgba(255, 255, 255, 0.13)'
        }
    }),
    brown: css({
        color: 'rgb(68, 42, 30)',
        backgroundColor: 'rgba(210, 162, 141, 0.35)',
        '@media (prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.87)',
            backgroundColor: 'rgba(184, 101, 67, 0.45)'
        }
    }),
    orange: css({
        color: 'rgb(73, 41, 14)',
        backgroundColor: 'rgba(224, 124, 57, 0.27)',
        '@media (prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.87)',
            backgroundColor: 'rgba(233, 126, 35, 0.45)'
        }
    }),
    yellow: css({
        color: 'rgb(64, 44, 27)',
        backgroundColor: 'rgba(236, 191, 66, 0.39)',
        '@media (prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.87)',
            backgroundColor: 'rgba(250, 177, 67, 0.5)'
        }
    }),
    green: css({
        color: 'rgb(28, 56, 41)',
        backgroundColor: 'rgba(123, 183, 129, 0.27)',
        '@media (prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.87)',
            backgroundColor: 'rgba(45, 153, 100, 0.5)'
        }
    }),
    blue: css({
        color: 'rgb(24, 51, 71)',
        backgroundColor: 'rgba(93, 165, 206, 0.27)',
        '@media (prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.87)',
            backgroundColor: 'rgba(51, 126, 169, 0.5)'
        }
    }),
    purple: css({
        color: 'rgb(65, 36, 84)',
        backgroundColor: 'rgba(168, 129, 197, 0.27)',
        '@media (prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.87)',
            backgroundColor: 'rgba(168, 91, 242, 0.34)'
        }
    }),
    pink: css({
        color: 'rgb(76, 35, 55)',
        backgroundColor: 'rgba(225, 136, 179, 0.27)',
        '@media (prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.87)',
            backgroundColor: 'rgba(220, 76, 145, 0.4)'
        }
    }),
    red: css({
        color: 'rgb(93, 23, 21)',
        backgroundColor: 'rgba(244, 171, 159, 0.4)',
        '@media (prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.87)',
            backgroundColor: 'rgba(222, 85, 83, 0.45)'
        }
    })
}

const signatureColorVar = '--signature-color'

export const signatureStyle = css({
    [signatureColorVar]: 'oklab(0% 0 0)',
    float: 'right',
    marginLeft: 'calc(var(--spacing) * 4)',
    '@media (prefers-color-scheme: dark)': {
        [signatureColorVar]: 'oklab(100% 0 0)'
    },
    '& path': {
        strokeDasharray: 880,
        strokeDashoffset: 880,
        strokeWidth: '0.25mm',
        fill: 'transparent',
        stroke: `var(${signatureColorVar})`,
        animation: 'draw-signature 6s linear infinite both'
    }
})

export const dividerStyle = css({
    borderWidth: 0,
    height: '0.5px',
    marginBlock: 'calc(var(--spacing)* 4)',
    backgroundColor: 'hsl(0deg 0% 0% / 30%)',
    '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'hsl(0deg 0% 100% / 30%)'
    }
})
