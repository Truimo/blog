import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  typedRoutes: true,
  async redirects() {
    return [
      // 旧文章路径永久重定向（308）
      { source: "/posts/:slug", destination: "/post/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
