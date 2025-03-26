import { style, styleVariants, globalStyle } from '@vanilla-extract/css'

export const bookmarkStyle = style({
    display: 'flex',
    border: '1px solid rgba(55, 53, 47, 0.16)',
    borderRadius: '4px',
    ':hover': {
        backgroundColor: 'rgba(55, 53, 47, 0.06)',
    },
    '@media': {
        '(prefers-color-scheme: dark)': {
            borderColor: 'rgba(255, 255, 255, 0.13)',
            ':hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.055)',
            },
        }
    }
})

export const infoStyle = style({
    padding: '12px 14px 14px',
    flex: '4',
    textAlign: 'left',
    overflow: 'hidden',
})

export const titleStyle = style({
    fontSize: '14px',
    lineHeight: '20px',
    minHeight: '24px',
    marginBottom: '2px',
    color: 'rgb(55, 53, 47)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '@media': {
        '(prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.81)'
        }
    }
})

export const desStyle = style({
    fontSize: '12px',
    lineHeight: '16px',
    height: '32px',
    color: 'rgba(55, 53, 47, 0.65)',
    overflow: 'hidden',
    '@media': {
        '(prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.443)'
        }
    }
})

export const linkStyle = style({
    fontSize: '12px',
    lineHeight: '16px',
    marginTop: '6px',
    color: 'rgb(55, 53, 47)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '@media': {
        '(prefers-color-scheme: dark)': {
            color: 'rgba(255, 255, 255, 0.81)'
        }
    }
})

export const iconStyle = style({
    float: 'left',
    width: '16px',
    height: '16px',
    minWidth: '16px',
    marginRight: '6px',
})

export const imagesStyle = style({
    flex: '2',
    position: 'relative',
})

export const imageStyle = style({
    position: 'absolute',
    inset: '0px',
})

export const imgStyle = style({
    // display: block,
    objectFit: 'cover',
    width: '100%',
    height: '100%',
})
