import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://painfulpastime.github.io',
  base: process.env.BASE_PATH || '/personal_website/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
