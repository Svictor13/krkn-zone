// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// Skip Netlify adapter in dev: @netlify/config crashes under Bun
// (omit.js ESM/CJS interop). Production build still uses it.
const isDev = process.argv.includes('dev') || process.env.NODE_ENV === 'development';

export default defineConfig({
  site: 'https://krkn.zone',
  ...(isDev ? {} : { adapter: netlify() }),
  integrations: [react()],
});
