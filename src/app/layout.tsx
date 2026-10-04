import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import {
  blogDescription,
  blogIcon,
  blogKeywords,
  blogLink,
  blogName,
  blogTitle,
} from "@/lib/site-info";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(blogLink),
  title: {
    default: blogTitle,
    template: `%s - ${blogTitle}`,
  },
  description: blogDescription,
  keywords: blogKeywords,
  icons: {
    icon: [{ url: blogIcon, type: "image/png", sizes: "500x500" }],
  },
  verification: {
    google: "GdFb_xYFw9Ait8bFcxGoIPoZwD1BfatxIpEXznZdpUE",
  },
  openGraph: {
    siteName: blogName,
    type: "website",
    images: [{ url: blogIcon }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN">
      <head>
        {/* RSS 自动发现：静态壳中稳定输出，不依赖 metadata 流式渲染 */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={blogTitle}
          href={`${blogLink}/feed`}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="main">{children}</main>
        <Footer />
        <Analytics />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static console greeting
          dangerouslySetInnerHTML={{
            __html:
              'console.log("%c Truimo\'s Blog %c https://github.com/Truimo/blog ", "color: #fff; margin: 1em 0; padding: 5px 0; background: #0ea5e9;", "margin: 1em 0; padding: 5px 0; background: #efefef;");',
          }}
        />
      </body>
    </html>
  );
}
