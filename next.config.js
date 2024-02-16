/** @type {import('next').NextConfig} */
const nextConfig = {
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
    }
}

module.exports = nextConfig
