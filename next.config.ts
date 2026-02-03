import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
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
    experimental: {
        useCache: true,
    }
}

export default nextConfig
