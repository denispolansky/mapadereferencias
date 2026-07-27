import { defineConfig } from 'astro/config';
import remarkWikilinks from './src/lib/remark-wikilinks.ts';

export default defineConfig({
  // El sitio se publica con GitHub Pages, colgando del nombre del repositorio.
  // Si algún día se le pone dominio propio: base: '/' y actualizar src/lib/rutas.ts.
  site: 'https://denispolansky.github.io',
  base: '/mapadereferencias',
  markdown: {
    remarkPlugins: [remarkWikilinks],
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
