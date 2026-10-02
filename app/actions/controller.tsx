import { createController } from 'remix/router'
import { assetServer } from '../assets.ts'
import { routes } from '../routes.ts'

import { HomePage } from '../ui/home-page.tsx'
import { FriendsPage } from '../ui/friends-page.tsx'
import { PostPage } from '../ui/post-page.tsx'
import { NotFoundPage } from '../ui/not-found.tsx'
import { getPosts, getPost, getPage } from '../libs/notion.server.ts'

import { action as bookmarkAction } from '../apis/bookmark.ts'
import { loader as notionImageLoader } from '../apis/notion-image.ts'
import { loader as notionVideoLoader } from '../apis/notion-video.ts'
import { loader as notionIconsLoader } from '../apis/notion-icons.ts'
import { loader as sitemapLoader } from '../apis/sitemap.ts'

export default createController(routes, {
  actions: {
    async assets(context) {
      return (
        (await assetServer.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
      )
    },
    async home(context) {
      const url = new URL(context.request.url)
      const cursor = url.searchParams.get('cursor') || undefined
      const data = await getPosts({ pageSize: 10, cursor })
      return context.render(<HomePage data={data} cursor={cursor} />)
    },
    async friends(context) {
      return context.render(<FriendsPage />)
    },
    async post(context) {
      const slug = context.params.slug
      if (!slug) return context.render(<NotFoundPage />, { status: 404 })
      const post = await getPost(slug)
      if (!post) return context.render(<NotFoundPage />, { status: 404 })
      const blocks = await getPage(post.id)
      return context.render(<PostPage post={post} blocks={blocks} />)
    },
    apiBookmark(context) {
      return bookmarkAction({ request: context.request })
    },
    apiNotionImage(context) {
      return notionImageLoader({ params: context.params, request: context.request })
    },
    apiNotionVideo(context) {
      return notionVideoLoader({ params: context.params, request: context.request })
    },
    apiNotionIcons(context) {
      return notionIconsLoader({ params: context.params, request: context.request })
    },
    sitemap() {
      return sitemapLoader()
    },
  },
})
