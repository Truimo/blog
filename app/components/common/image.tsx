interface CamoImageProps {
    src: string | undefined
    alt: string
    className?: string
    loading?: "eager" | "lazy" | undefined
}

export function CamoImage({ src, alt, className, loading }: CamoImageProps) {

    return (
        <img src={src} alt={alt} className={className} loading={loading} crossOrigin='anonymous' />
    )
}
