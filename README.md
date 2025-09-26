
# unit-relay-cloudflare

一个最小可部署的 Cloudflare Worker 中转，将
`GET /operations/:addr` 代理到 `UPSTREAM_BASE/operations/:addr`。

## 部署
1) 安装并登录 wrangler：
   ```bash
   npm i -g wrangler
   wrangler login
   ```

2) 配置变量（可在 wrangler.toml 中直接写 vars，或用 env vars 覆盖）：
   ```toml
   [vars]
   UPSTREAM_BASE = "https://api.hyperunit.xyz"
   ```

3) 本地预览（可选）：
   ```bash
   wrangler dev
   ```

4) 发布：
   ```bash
   wrangler publish
   ```

## 使用
发布后测试：
```
https://<your-worker>.workers.dev/operations/0x1234...
```
在你的 Streamlit 应用中将 `BASE_URL` 设为你的 Worker 根：
```
https://<your-worker>.workers.dev
```
