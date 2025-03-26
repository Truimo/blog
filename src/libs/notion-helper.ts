import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

type PageObjectResponsePropertiesValue = PageObjectResponse['properties'][string]

export function getTitleProperty(property: PageObjectResponsePropertiesValue): string | null {
    if (property.type === 'title') {
        return property.title.map(it => it.plain_text).join('')
    }

    return null
}

export function getTtitlePropertyOnly(property: PageObjectResponsePropertiesValue): string {
    const str = getTitleProperty(property)

    if (null === str) {
        return ''
    }

    return str
}

export function getRichTextProperty(property: PageObjectResponsePropertiesValue): string | null {
    if (property.type === 'rich_text') {
        return property.rich_text.map(it => it.plain_text).join('')
    }

    return null
}

export function getRichTextPropertyOnly(property: PageObjectResponsePropertiesValue): string {
    const str = getRichTextProperty(property)

    if (null === str) {
        return ''
    }

    return str
}

export function getUrlProperty(property: PageObjectResponsePropertiesValue): string | null {
    if (property.type === 'url') {
        return property.url
    }

    return null
}

export function getUrlPropertyOnly(property: PageObjectResponsePropertiesValue): string {
    const str = getUrlProperty(property)

    if (null === str) {
        return ''
    }

    return str
}
