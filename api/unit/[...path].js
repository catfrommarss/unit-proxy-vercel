export default async function handler(req, res) {
  try {
    const parts = (req.query.path || []);            // ["operations","0x..."] 或 ["testnet","operations","0x..."]
    const isTestnet = parts[0] === "testnet";
    const realParts = isTestnet ? parts.slice(1) : parts;
    const upstreamBase = isTestnet
      ? "https://api.hyperunit-testnet.xyz"
      : "https://api.hyperunit.xyz";

    const pathname = realParts.join("/");
    const qs = req.url.includes("?") ? "?" + req.url.split("?")[1] : "";
    const url = `${upstreamBase}/${pathname}${qs}`;

    const r = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "accept": "application/json,text/plain,*/*"
      }
    });

    const ctype = r.headers.get("content-type") || "application/json";
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader("content-type", ctype);
    res.setHeader("cache-control", "no-store");
    res.status(r.status).send(buf);
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
}

