# Blog

A personal blog built with Next.js 16, React 19 and Tailwind CSS v4, using **Notion as the CMS**.

使用 Next.js 16、React 19 与 Tailwind CSS v4 构建的个人博客，以 **Notion 作为内容管理系统**。

## Quick Start

Prerequisites: **Node >= 24.3.0** and **pnpm 10**.

```bash
pnpm install
cp .env.template .env.local   # then fill in the values / 填入配置
pnpm dev
```

### Environment

| Variable                    | Description                              |
| --------------------------- | ---------------------------------------- |
| `NOTION_KEY`                | Notion integration secret / 集成密钥     |
| `NOTION_DATABASE_ID`        | Notion database ID for posts / 文章数据库 ID |
| `NOTION_CREATOR_ID`         | Notion user ID of the blog owner / 博主 Notion 用户 ID |
| `UPSTASH_REDIS_REST_URL`    | Upstash Redis REST URL                   |
| `UPSTASH_REDIS_REST_TOKEN`  | Upstash Redis REST token                 |

> `NOTION_CREATOR_ID` is required to serve file-backed images and videos;
> without it those requests return 404.
> 文件类图片与视频依赖 `NOTION_CREATOR_ID`，未配置时相关请求返回 404。

## Scripts

| Command           | Action                              |
| ----------------- | ----------------------------------- |
| `pnpm dev`        | Start the dev server / 启动开发服务器 |
| `pnpm build`      | Production build / 生产构建          |
| `pnpm start`      | Serve the production build / 运行生产构建 |
| `pnpm lint`       | Biome check / 代码检查               |
| `pnpm format`     | Biome format (write) / 格式化        |
| `pnpm typecheck`  | `tsc --noEmit` / 类型检查            |

## License

[AGPL-3.0](./LICENSE)
