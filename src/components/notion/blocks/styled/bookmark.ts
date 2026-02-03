import styled from 'styled-components'

export const BookmarkLink = styled.a`
    display: flex;
    border: 1px solid rgba(55, 53, 47, 0.16);
    border-radius: 4px;
    &:hover {
        background-color: rgba(55, 53, 47, 0.06);
    }
    @media (prefers-color-scheme: dark) {
        border-color: rgba(255, 255, 255, 0.13);
        &:hover {
            background-color: rgba(255, 255, 255, 0.055);
        }
    }
`

export const BookmarkInfoBox = styled.div`
    padding: 12px 14px 14px;
    flex: 4;
    text-align: left;
    overflow: hidden;
`

export const BookmarkTitle = styled.p`
    font-size: 14px;
    line-height: 20px;
    min-height: 24px;
    margin-bottom: 2px;
    color: rgb(55, 53, 47);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @media (prefers-color-scheme: dark) {
        color: rgba(255, 255, 255, 0.81);
    }
`

export const BookmarkDescription = styled.p`
    font-size: 12px;
    line-height: 16px;
    height: 32px;
    color: rgba(55, 53, 47, 0.65);
    overflow: hidden;
    @media (prefers-color-scheme: dark) {
        color: rgba(255, 255, 255, 0.443);
    }
`

export const BookmarkLinkText = styled.p`
    font-size: 12px;
    line-height: 16px;
    margin-top: 6px;
    color: rgb(55, 53, 47);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @media (prefers-color-scheme: dark) {
        color: rgba(255, 255, 255, 0.81);
    }
`

export const BookmarkIcon = styled.img.attrs({ crossOrigin: 'anonymous' })`
    float: left;
    width: 16px;
    height: 16px;
    min-width: 16px;
    margin-right: 6px;
`

export const BookmarkImages = styled.div`
    flex: 2;
    position: relative;
`

export const BookmarkImageFrame = styled.div`
    position: absolute;
    inset: 0;
`

export const BookmarkImg = styled.img.attrs({ crossOrigin: 'anonymous' })`
    object-fit: cover;
    width: 100%;
    height: 100%;
`
