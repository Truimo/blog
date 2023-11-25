
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
}

export default function Icon({icon}: {
    icon: Icon
}) {
    switch (icon.type) {
        case 'emoji':
            return <span>{icon.emoji}</span>
        case 'external':
            return <img className="inline-block object-cover h-em" src={icon.external.url} alt="icon"/>
        case 'file':
            return <img className="inline-block object-cover h-em" src={icon.file.url} alt="icon"/>
    }
}
