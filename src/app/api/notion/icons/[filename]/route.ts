const FILENAME_PATTERN = /^[A-Za-z0-9_-]+\.svg$/;

export async function GET(
  request: Request,
  ctx: RouteContext<"/api/notion/icons/[filename]">,
) {
  const { filename } = await ctx.params;

  if (!FILENAME_PATTERN.test(filename)) {
    return new Response("Not Found", { status: 404 });
  }

  // Notion noticons switch fill colors via ?mode=light|dark — forward it.
  const mode = new URL(request.url).searchParams.get("mode");
  const query =
    mode === "dark" ? "?mode=dark" : mode === "light" ? "?mode=light" : "";
  const url = `https://www.notion.so/icons/${filename}${query}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "User-Agent": request.headers.get("User-Agent") ?? "" },
  });

  if (!res.ok) {
    return new Response("Not Found", { status: 404 });
  }

  const buffer = await res.arrayBuffer();

  const headers: Record<string, string> = {
    "Content-Type": "application/octet-stream",
    "Cache-Control": "public, max-age=604800, immutable",
  };
  const contentType = res.headers.get("Content-Type");
  if (contentType !== null) {
    headers["Content-Type"] = contentType;
  }

  return new Response(buffer, { headers });
}
