import type {NextConfig} from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/post/:id',
                destination: '/posts/:id',
                permanent: true
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/',
                headers: [
                    {
                        key: 'Permissions-Policy',
                        value: 'interest-cohort=()'
                    }
                ]
            }
        ]
    },
    experimental: {}
}

export default withVanillaExtract(nextConfig)
