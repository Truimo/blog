import styled from 'styled-components'

export const BookmarkCard = styled.div`
    display: flex;
    align-items: stretch;
    border-radius: 4px;
    border: 1px solid rgba(55, 53, 47, 0.16);
    overflow: hidden;
    user-select: none;

    @media (prefers-color-scheme: dark) {
        border-color: rgba(255, 255, 255, 0.13);
    }
`

export const BookmarkTitleText = styled.p`
    color: rgb(55, 53, 47);

    @media (prefers-color-scheme: dark) {
        color: rgba(255, 255, 255, 0.81);
    }
`

export const BookmarkDescriptionText = styled.p`
    color: rgba(55, 53, 47, 0.65);

    @media (prefers-color-scheme: dark) {
        color: rgba(255, 255, 255, 0.443);
    }
`

export const BookmarkLinkText = styled.p`
    color: rgb(55, 53, 47);

    @media (prefers-color-scheme: dark) {
        color: rgba(255, 255, 255, 0.81);
    }
`
