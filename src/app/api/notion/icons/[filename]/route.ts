export async function GET(
  request: Request,
  ctx: RouteContext<"/api/notion/icons/[filename]">,
) {
  const { filename } = await ctx.params;
  const url = `https://www.notion.so/icons/${filename}`;

  const res = await fetch(url, {
    method: "GET",
    headers: request.headers,
  });

  const buffer = await res.arrayBuffer();

  const headers: Record<string, string> = {
    "Content-Type": "application/octet-stream",
    "Cache-Control": "public, max-age=604800, immutable",
  };
  const contentType = res.headers.get("Content-Type");
  const contentLength = res.headers.get("Content-Length");
  if (contentType !== null) {
    headers["Content-Type"] = contentType;
  }
  if (contentLength !== null) {
    headers["Content-Length"] = contentLength;
  }

  return new Response(buffer, { headers });
}
