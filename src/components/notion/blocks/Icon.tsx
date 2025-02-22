import {CamoImage} from '@/components/common/Image';

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
            if (icon.external.url.includes('truimo.com')) {
                return <img className="inline-block object-cover h-em" src={icon.external.url} alt="icon"/>
            } else {
                return <CamoImage className="inline-block object-cover h-em" src={icon.external.url} alt="icon"/>
            }
        case 'file':
            return <img className="inline-block object-cover h-em" src={icon.file.url} alt="icon"/>
    }
}
