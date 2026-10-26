// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://barshan-portfolio.vercel.app',
  build: {
    // The homepage ships only about 20 KiB of CSS; inline it to remove
    // two render-blocking stylesheet round trips on slow mobile networks.
    inlineStylesheets: 'always',
  },
  legacy: {
    collectionsBackwardsCompat: true,
  },
});