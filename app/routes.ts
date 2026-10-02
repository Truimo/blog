import { get, post, route } from 'remix/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: get('/'),
  post: get('/posts/:slug'),
  friends: get('/friends'),
  sitemap: get('/sitemap.xml'),
  apiBookmark: post('/api/bookmark'),
  apiNotionImage: get('/api/notion/image/:id'),
  apiNotionVideo: get('/api/notion/video/:id'),
  apiNotionIcons: get('/api/notion/icons/:filename'),
})
