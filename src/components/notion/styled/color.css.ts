import { style, styleVariants, globalStyle } from '@vanilla-extract/css'

export const colorVariants = styleVariants({
    default: {
        color: 'rgb(55, 53, 47)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                color: 'rgba(255, 255, 255, 0.81)'
            }
        }
    },
    gray: {
        color: 'rgba(120, 119, 116, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                color: 'rgba(155, 155, 155, 1)'
            }
        }
    },
    brown: {
        color: 'rgba(159, 107, 83, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                color: 'rgba(186, 133, 111, 1)'
            }
        }
    },
    orange: {
        color: 'rgba(217, 115, 13, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                color: 'rgba(199, 125, 72, 1)'
            }
        }
    },
    yellow: {
        color: 'rgba(203, 145, 47, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                color: 'rgba(202, 152, 77, 1)'
            }
        }
    },
    green: {
        color: 'rgba(68, 131, 97, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                color: 'rgba(82, 158, 114, 1)'
            }
        }
    },
    blue: {
        color: 'rgba(51, 126, 169, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                color: 'rgba(55, 154, 211, 1)'
            }
        }
    },
    purple: {
        color: 'rgba(144, 101, 176, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                color: 'rgba(157, 104, 211, 1)'
            }
        }
    },
    pink: {
        color: 'rgba(193, 76, 138, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                color: 'rgba(209, 87, 150, 1)'
            }
        }
    },
    red: {
        color: 'rgba(212, 76, 71, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                color: 'rgba(223, 84, 82, 1)'
            }
        }
    },
    default_background: {
        backgroundColor: 'inherit'
    },
    gray_background: {
        backgroundColor: 'rgba(248, 248, 247, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                backgroundColor: 'rgba(47, 47, 47, 1)'
            }
        }
    },
    brown_background: {
        backgroundColor: 'rgba(244, 238, 238, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                backgroundColor: 'rgba(74, 50, 40, 1)'
            }
        }
    },
    orange_background: {
        backgroundColor: 'rgba(251, 236, 221, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                backgroundColor: 'rgba(92, 59, 35, 1)'
            }
        }
    },
    yellow_background: {
        backgroundColor: 'rgba(251, 243, 219, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                backgroundColor: 'rgba(86, 67, 40, 1)'
            }
        }
    },
    green_background: {
        backgroundColor: 'rgba(237, 243, 236, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                backgroundColor: 'rgba(36, 61, 48, 1)'
            }
        }
    },
    blue_background: {
        backgroundColor: 'rgba(231, 243, 248, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                backgroundColor: 'rgba(20, 58, 78, 1)'
            }
        }
    },
    purple_background: {
        backgroundColor: 'rgba(248, 243, 252, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                backgroundColor: 'rgba(60, 45, 73, 1)'
            }
        }
    },
    pink_background: {
        backgroundColor: 'rgba(252, 241, 246, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                backgroundColor: 'rgba(78, 44, 60, 1)'
            }
        }
    },
    red_background: {
        backgroundColor: 'rgba(253, 235, 236, 1)',
        '@media': {
            '(prefers-color-scheme: dark)': {
                backgroundColor: 'rgba(82, 46, 42, 1)'
            }
        }
    }
})

export const codeTextStyle = style({
    backgroundColor: 'rgba(135, 131, 120, 0.15)',
    color: '#EB5757',
    borderRadius: '4px',
    padding: '0.2em 0.4em',
    fontSize: '85%',
    '@media': {
        '(prefers-color-scheme: dark)': {
            backgroundColor: 'rgba(135, 131, 120, 0.15)'
        }
    }
})

globalStyle(`${codeTextStyle} + ${codeTextStyle}`, {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    paddingLeft: '0',
})
  
globalStyle(`${codeTextStyle}:has(+ ${codeTextStyle})`, {
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
    paddingRight: '0',
})
