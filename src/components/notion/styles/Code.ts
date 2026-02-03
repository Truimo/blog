import styled from 'styled-components'

export const CodeWrap = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;

    pre > code {
        display: block;
        background: transparent !important;
        font-size: 14px;
        line-height: 1.5;
        font-weight: 500;
        font-family: var(--font-mono);
    }

    pre.line-numbers {
        padding-left: 2.8em !important;
    }
`

export const CodeLanguageTip = styled.div`
    position: absolute;
    right: 1em;
    transform: translate(-0.5em, 1em);
    font-size: 0.8em;
    opacity: 0.7;
    z-index: 1;

    @media (prefers-color-scheme: dark) {
        color: hsl(230, 8%, 24%);
    }
`
