import { css } from 'styled-system/css'

export const bookmarkStyle = css({
    display: 'flex',
    border: '1px solid rgba(55, 53, 47, 0.16)',
    borderRadius: '4px',
    '&:hover': {
        backgroundColor: 'rgba(55, 53, 47, 0.06)'
    },
    '@media (prefers-color-scheme: dark)': {
        borderColor: 'rgba(255, 255, 255, 0.13)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.055)'
        }
    }
})

export const infoStyle = css({
    padding: '12px 14px 14px',
    flex: '4',
    textAlign: 'left',
    overflow: 'hidden'
})

export const titleStyle = css({
    fontSize: '14px',
    lineHeight: '20px',
    minHeight: '24px',
    marginBottom: '2px',
    color: 'rgb(55, 53, 47)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '@media (prefers-color-scheme: dark)': {
        color: 'rgba(255, 255, 255, 0.81)'
    }
})

export const desStyle = css({
    fontSize: '12px',
    lineHeight: '16px',
    height: '32px',
    color: 'rgba(55, 53, 47, 0.65)',
    overflow: 'hidden',
    '@media (prefers-color-scheme: dark)': {
        color: 'rgba(255, 255, 255, 0.443)'
    }
})

export const linkStyle = css({
    fontSize: '12px',
    lineHeight: '16px',
    marginTop: '6px',
    color: 'rgb(55, 53, 47)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '@media (prefers-color-scheme: dark)': {
        color: 'rgba(255, 255, 255, 0.81)'
    }
})

export const iconStyle = css({
    float: 'left',
    width: '16px',
    height: '16px',
    minWidth: '16px',
    marginRight: '6px'
})

export const imagesStyle = css({
    flex: '2',
    position: 'relative'
})

export const imageStyle = css({
    position: 'absolute',
    inset: '0px'
})

export const imgStyle = css({
    objectFit: 'cover',
    width: '100%',
    height: '100%'
})
