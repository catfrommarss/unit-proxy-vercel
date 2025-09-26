
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+/, '');

    if (!path.startsWith('operations/')) {
      return new Response(JSON.stringify({ error: 'invalid path', expect: '/operations/:addr' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const upstreamBase = (env.UPSTREAM_BASE || 'https://api.hyperunit.xyz').replace(/\/$/, '');
    const upstreamUrl = `${upstreamBase}/${path}`;

    const resp = await fetch(upstreamUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 UnitOpsRelay/1.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Connection": "keep-alive"
      }
    });

    const text = await resp.text();
    return new Response(text, {
      status: resp.status,
      headers: {
        "Content-Type": resp.headers.get("Content-Type") || "application/json",
        "Cache-Control": "no-store"
      }
    });
  }
};
