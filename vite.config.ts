import {reactRouter} from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'


export default defineConfig({
    plugins: [tailwindcss(), vanillaExtractPlugin(), reactRouter(), tsconfigPaths()],
})
