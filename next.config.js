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
    }
}

module.exports = nextConfig
