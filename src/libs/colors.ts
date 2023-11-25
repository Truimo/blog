export type Colors = {
    [key: string]: {
        text: {
            normal: string
        },
        background: {
            normal: string
        }
    }
}

export const colors: Colors = {
    'default': {
        'text': {
            'normal': 'text-inherit dark:text-inherit',
        },
        'background': {
            'normal': 'bg-inherit dark:bg-inherit',
        }
    },
    'gray': {
        'text': {
            'normal': 'text-gray-900 dark:text-gray-100',
        },
        'background': {
            'normal': 'bg-gray-100 dark:bg-gray-900',
        }
    },
    'brown': {
        'text': {
            'normal': 'text-amber-900 dark:text-amber-100',
        },
        'background': {
            'normal': 'bg-amber-100 dark:bg-amber-900',
        }
    },
    'orange': {
        'text': {
            'normal': 'text-orange-900 dark:text-orange-100',
        },
        'background': {
            'normal': 'bg-orange-100 dark:bg-orange-900',
        }
    },
    'yellow': {
        'text': {
            'normal': 'text-yellow-900 dark:text-yellow-100',
        },
        'background': {
            'normal': 'bg-yellow-100 dark:bg-yellow-900',
        }
    },
    'green': {
        'text': {
            'normal': 'text-green-900 dark:text-green-100',
        },
        'background': {
            'normal': 'bg-green-100 dark:bg-green-900',
        }
    },
    'blue': {
        'text': {
            'normal': 'text-blue-900 dark:text-blue-100',
        },
        'background': {
            'normal': 'bg-blue-100 dark:bg-blue-900',
        }
    },
    'purple': {
        'text': {
            'normal': 'text-purple-900 dark:text-purple-100',
        },
        'background': {
            'normal': 'bg-purple-100 dark:bg-purple-900',
        }
    },
    'pink': {
        'text': {
            'normal': 'text-pink-900 dark:text-pink-100',
        },
        'background': {
            'normal': 'bg-pink-100 dark:bg-pink-900',
        }
    },
    'red': {
        'text': {
            'normal': 'text-red-900 dark:text-red-100',
        },
        'background': {
            'normal': 'bg-red-100 dark:bg-red-900',
        }
    }
}

export function getTextColor(color: string): string {
    return colors[color] ? colors[color].text.normal : colors['default'].text.normal
}

