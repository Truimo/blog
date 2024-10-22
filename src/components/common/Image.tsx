'use client';

import {useEffect, useState} from 'react';

const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

interface CamoImageProps {
    src: string | undefined
    alt: string
    className?: string
    loading?: "eager" | "lazy" | undefined
}

function base64ToBlob(data: string, contentType: string = 'application/octet-stream'): Blob {
    const byteArray = Uint8Array.from(atob(data), byte => byte.charCodeAt(0));
    return new Blob([byteArray], {type: contentType});
}

export function CamoImage({ src, alt, className, loading }: CamoImageProps) {
    if (void 0 === src) {
        return <img src={src} alt={alt} className={className} loading={loading}></img>
    }

    const [url, setUrl] = useState<string>(transparentImage);

    useEffect(() => {
        const data = { src }
        fetch('/api/camo', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((response: Response) => {
            const headers = response.headers;
            const type: string = headers.has('X-Content-Type') ? headers.get('X-Content-Type')! : 'application/octet-stream';
            return new Promise<{
                type: string,
                content: string,
            }>((resolve, reject) => {
                response.text().then((data: string) => {
                    resolve({
                        type, content: data,
                    })
                }).catch(reject)
            })
        }).then((data: {
            type: string,
            content: string
        }) => {
            const blob = base64ToBlob(data.content, data.type)
            const url = URL.createObjectURL(blob);
            setUrl(url);
        })

        return () => {
            URL.revokeObjectURL(url);
        }
    }, [])

    return (
        <img src={url} alt={alt} className={className} loading={loading}></img>
    )
}
