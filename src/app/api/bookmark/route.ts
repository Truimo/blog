import { unfurl } from "unfurl.js";

const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36";

function isSafeUrl(raw: string): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return false;

  const host = url.hostname.toLowerCase();
  if (
    host.includes(":") ||
    host === "localhost" ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  )
    return false;

  // 拒绝 IPv4 私有/保留地址段
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a === 0 || a === 10 || a === 127) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && b === 168) return false;
    if (a === 169 && b === 254) return false;
  }
  return true;
}

export async function POST(request: Request) {
  const body = (await request.json()) as { url?: string };

  if (typeof body.url !== "string" || !isSafeUrl(body.url)) {
    return Response.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const result = await unfurl(body.url, {
      headers: { "User-Agent": userAgent },
    });
    return Response.json(result);
  } catch {
    return Response.json({ error: "Illegal request" }, { status: 400 });
  }
}
