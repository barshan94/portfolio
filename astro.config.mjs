// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://barshan-portfolio.vercel.app',
  legacy: {
    collectionsBackwardsCompat: true,
  },
});