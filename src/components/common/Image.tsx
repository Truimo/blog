import { generateCamoUrl } from '@/libs/camo'

interface CamoImageProps {
    src: string | undefined
    alt: string
    className?: string
    loading?: "eager" | "lazy" | undefined
}

export function CamoImage({ src, alt, className, loading }: CamoImageProps) {
    const camoUrl = src ? generateCamoUrl(src) : src

    return (
        <img src={camoUrl} alt={alt} className={className} loading={loading}></img>
    )
}
