import { generateCamoUrl } from '@/libs/camo'

interface CamoImageProps {
    src: string | undefined
    alt: string
    className?: string
    loading?: "eager" | "lazy" | undefined
}

export function CamoImage({ src, alt, className, loading }: CamoImageProps) {
    if (void 0 === src) {
        return <img src={src} alt={alt} className={className} loading={loading}></img>
    }

    const camoUrl = generateCamoUrl(src)

    return (
        <img src={camoUrl} alt={alt} className={className} loading={loading}></img>
    )
}
