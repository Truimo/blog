import { createAssetServer } from 'remix/assets'

import { mermaidCjsGlobalsLoader } from './mermaid-cjs-loader.ts'

const rootDir = process.cwd()

const nodeEnv = process.env.NODE_ENV ?? 'development'
const isDevelopment = nodeEnv === 'development'

export const assetServer = createAssetServer({
    basePath: '/assets',
    rootDir,
    mounts: {
        app: 'app',
        node_modules: 'node_modules',
    },
    allowFiles: ['app/assets/**', 'app/styles/**'],
    allowPackages: ['remix', 'katex', 'mermaid', 'clsx', 'tailwind-merge', 'dayjs', 'shiki', '@shikijs/transformers'],
    denyFiles: ['app/**/*.server.*'],
    files: {
        extensions: ['.woff2', '.woff', '.ttf', '.eot', '.otf', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp'],
    },
    minify: !isDevelopment,
    sourceMaps: isDevelopment ? 'external' : undefined,
    watch: isDevelopment,
    scripts: {
        define: {
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
        },
        loaders: [mermaidCjsGlobalsLoader],
    },
})
