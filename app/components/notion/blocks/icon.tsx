type Icon = {
    type: 'emoji',
    emoji: string
} | {
    type: 'external',
    external: {
        url: string
    }
} | {
    type: 'file',
    file: {
        url: string,
        expiry_time: string
    }
} | {
    type: 'custom_emoji',
    custom_emoji: object,
}

export default function Icon({icon}: {
    icon: Icon
}) {
    switch (icon.type) {
        case 'emoji':
            return <span>{icon.emoji}</span>
        case 'external':
            const notion: string = 'https://www.notion.so/icons/'
            const link: string = icon.external.url.startsWith(notion) ? `/api/notion/icons/${icon.external.url.slice(notion.length)}` : icon.external.url
            return <img className="inline-block object-cover h-em" src={link} alt="icon"/>
        case 'file':
            return <img className="inline-block object-cover h-em" src={icon.file.url} alt="icon"/>
    }
}
