# Jean Stores — Cloudflare Pages starter

This package preserves the existing storefront UI and adds the first Cloudflare Pages configuration hook plus a backend health check. It is **not yet a completed store backend**: the existing D1 table schemas and Cloudflare account bindings must be verified before wiring products, orders, admin authentication, and payment evidence. This avoids overwriting or guessing your existing database structure.

## Upload to GitHub

1. Download and unzip this package.
2. In your existing GitHub repository, upload/replace `index.html`.
3. Also upload `functions/` and `wrangler.toml` to the repository root.
4. Commit the changes. Keep your existing repository files unless they are explicitly replaced by these files.

## Connect Cloudflare Pages

1. Open Cloudflare Dashboard → **Workers & Pages** → your Pages project.
2. Confirm the project is connected to this GitHub repository and that the production branch is correct.
3. Under **Settings → Bindings**, add a **D1 database** binding:
   - Variable name: `DB`
   - Select the database that already contains your store tables.
4. Trigger a new deployment.
5. Visit `https://YOUR-SITE-DOMAIN/api/health`.
   - `{"ok":true,"database":"connected"}` means the Pages Function can reach D1.
   - `503` means the binding is missing, the deployment has not updated, or the database is not reachable.

## Important before enabling orders/admin

- Do not use the browser-stored admin password as real authentication. It is visible to visitors and must be replaced with server-side authentication.
- Do not store payment screenshots as Base64 in browser storage for production. Use private object storage (for example, a private R2 bucket) and server-side authorization.
- Do not run a new schema migration against your existing database until its real schema has been inspected. The store's existing tables should be preserved.
- The current `index.html` keeps the existing storefront interactions; the API health route is a connection test only. Product/order persistence and secure admin operations still need to be wired to the verified schema.

## What to send next

After uploading and deploying, send the GitHub repository URL and the `/api/health` result. To safely finish the backend, the existing D1 table schemas are also needed (Cloudflare Dashboard → D1 → database → Tables/schema, or export the schema with `wrangler d1 export ... --no-data`). Do not send passwords, API tokens, or secret values.
