import type {RouteConfig} from '@react-router/dev/routes'
import {index, route} from '@react-router/dev/routes'

export default [
    index('routes/home.tsx'),
    route('posts/:slug', 'routes/posts.tsx'),
    route('friends', 'routes/friends.tsx'),
    route('sitemap.xml', 'apis/sitemap.ts'),
    route('api/posts', 'apis/posts.ts'),
    route('api/bookmark', 'apis/bookmark.ts'),
    route('api/notion/image/:id', 'apis/notion-image.ts'),
    route('api/notion/icons/:filename', 'apis/notion-icons.ts'),
] satisfies RouteConfig
