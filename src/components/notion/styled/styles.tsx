import { createGlobalStyle, css } from 'styled-components'

const notionColorStyles = {
    current: css`
        color: currentcolor;
    `,
    default: css`
        color: rgb(55, 53, 47);
        @media (prefers-color-scheme: dark) {
            color: rgba(255, 255, 255, 0.81);
        }
    `,
    gray: css`
        color: rgba(120, 119, 116, 1);
        @media (prefers-color-scheme: dark) {
            color: rgba(155, 155, 155, 1);
        }
    `,
    brown: css`
        color: rgba(159, 107, 83, 1);
        @media (prefers-color-scheme: dark) {
            color: rgba(186, 133, 111, 1);
        }
    `,
    orange: css`
        color: rgba(217, 115, 13, 1);
        @media (prefers-color-scheme: dark) {
            color: rgba(199, 125, 72, 1);
        }
    `,
    yellow: css`
        color: rgba(203, 145, 47, 1);
        @media (prefers-color-scheme: dark) {
            color: rgba(202, 152, 77, 1);
        }
    `,
    green: css`
        color: rgba(68, 131, 97, 1);
        @media (prefers-color-scheme: dark) {
            color: rgba(82, 158, 114, 1);
        }
    `,
    blue: css`
        color: rgba(51, 126, 169, 1);
        @media (prefers-color-scheme: dark) {
            color: rgba(55, 154, 211, 1);
        }
    `,
    purple: css`
        color: rgba(144, 101, 176, 1);
        @media (prefers-color-scheme: dark) {
            color: rgba(157, 104, 211, 1);
        }
    `,
    pink: css`
        color: rgba(193, 76, 138, 1);
        @media (prefers-color-scheme: dark) {
            color: rgba(209, 87, 150, 1);
        }
    `,
    red: css`
        color: rgba(212, 76, 71, 1);
        @media (prefers-color-scheme: dark) {
            color: rgba(223, 84, 82, 1);
        }
    `,
    default_background: css`
        background-color: inherit;
    `,
    gray_background: css`
        background-color: rgba(248, 248, 247, 1);
        @media (prefers-color-scheme: dark) {
            background-color: rgba(47, 47, 47, 1);
        }
    `,
    brown_background: css`
        background-color: rgba(244, 238, 238, 1);
        @media (prefers-color-scheme: dark) {
            background-color: rgba(74, 50, 40, 1);
        }
    `,
    orange_background: css`
        background-color: rgba(251, 236, 221, 1);
        @media (prefers-color-scheme: dark) {
            background-color: rgba(92, 59, 35, 1);
        }
    `,
    yellow_background: css`
        background-color: rgba(251, 243, 219, 1);
        @media (prefers-color-scheme: dark) {
            background-color: rgba(86, 67, 40, 1);
        }
    `,
    green_background: css`
        background-color: rgba(237, 243, 236, 1);
        @media (prefers-color-scheme: dark) {
            background-color: rgba(36, 61, 48, 1);
        }
    `,
    blue_background: css`
        background-color: rgba(231, 243, 248, 1);
        @media (prefers-color-scheme: dark) {
            background-color: rgba(20, 58, 78, 1);
        }
    `,
    purple_background: css`
        background-color: rgba(248, 243, 252, 1);
        @media (prefers-color-scheme: dark) {
            background-color: rgba(60, 45, 73, 1);
        }
    `,
    pink_background: css`
        background-color: rgba(252, 241, 246, 1);
        @media (prefers-color-scheme: dark) {
            background-color: rgba(78, 44, 60, 1);
        }
    `,
    red_background: css`
        background-color: rgba(253, 235, 236, 1);
        @media (prefers-color-scheme: dark) {
            background-color: rgba(82, 46, 42, 1);
        }
    `
} as const

export type NotionColorKey = keyof typeof notionColorStyles

export const notionCodeClass = 'notion-code'

export const NotionGlobalStyles = createGlobalStyle`
    ${Object.entries(notionColorStyles).map(([key, styles]) => css`
        .notion-color-${key} {
            ${styles}
        }
    `)}

    .${notionCodeClass} {
        background-color: rgba(135, 131, 120, 0.15);
        color: #eb5757;
        border-radius: 4px;
        padding: 0.2em 0.4em;
        font-size: 85%;
        @media (prefers-color-scheme: dark) {
            background-color: rgba(135, 131, 120, 0.15);
        }
    }

    .${notionCodeClass} + .${notionCodeClass} {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        padding-left: 0;
    }

    .${notionCodeClass}:has(+ .${notionCodeClass}) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        padding-right: 0;
    }
`

export const getNotionColorClass = (color?: string) => {
    const key = (color ?? 'current') as NotionColorKey
    if (key in notionColorStyles) {
        return `notion-color-${key}`
    }
    return ''
}
