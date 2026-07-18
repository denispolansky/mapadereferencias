import { findAndReplace } from 'mdast-util-find-and-replace';
import { getSlugIndex } from './slugs.ts';

const WIKILINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/** Convierte [[slug]] y [[slug|texto visible]] en enlaces a /tipo/slug.
 * Si el slug no existe todavía, deja el texto visible pero marcado como roto. */
export default function remarkWikilinks() {
  return (tree: any) => {
    const index = getSlugIndex();
    findAndReplace(tree, [
      [
        WIKILINK_RE,
        (_match: string, rawSlug: string, rawLabel?: string) => {
          const slug = rawSlug.trim();
          const texto = (rawLabel ?? rawSlug).trim();
          const tipo = index.get(slug);
          if (!tipo) {
            return {
              type: 'text',
              value: texto,
              data: {
                hName: 'span',
                hProperties: {
                  className: ['wikilink-roto'],
                  title: `entrada no encontrada: ${slug}`,
                },
              },
            };
          }
          return {
            type: 'link',
            url: `/${tipo}/${slug}`,
            data: { hProperties: { className: ['wikilink'] } },
            children: [{ type: 'text', value: texto }],
          };
        },
      ],
    ]);
  };
}
