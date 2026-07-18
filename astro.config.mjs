import { defineConfig } from 'astro/config';
import remarkWikilinks from './src/lib/remark-wikilinks.ts';

export default defineConfig({
  site: 'https://example.com',
  markdown: {
    remarkPlugins: [remarkWikilinks],
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
