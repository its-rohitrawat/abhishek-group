// @ts-check
import { defineConfig } from 'astro/config';

// Static output. Add an adapter (Vercel / Netlify / Cloudflare) when server-side
// form endpoints are added — secrets must stay in server-only env vars.
export default defineConfig({
  site: 'https://www.abhishekgroup.co.in',
});
