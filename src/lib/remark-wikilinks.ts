import { findAndReplace } from 'mdast-util-find-and-replace';
import { getSlugIndex, slugificar } from './slugs.ts';
import { ruta } from './rutas.ts';

/** Captura [[enlace]], [[enlace|texto]] y también ![[archivo]] (embed de Obsidian). */
const WIKILINK_RE = /(!?)\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

const EXTENSIONES_IMAGEN = /\.(jpe?g|png|gif|webp|avif|heic|heif|tiff?|bmp|svg)$/i;

/** Convierte la sintaxis de Obsidian en HTML del sitio:
 *  - ![[foto.jpg]]        -> <img> apuntando a /media (arrastrar y soltar funciona tal cual)
 *  - [[slug]]             -> enlace a /tipo/slug
 *  - [[slug|texto]]       -> enlace con texto visible propio
 * Si el slug no existe todavía, deja el texto visible pero marcado como roto. */
export default function remarkWikilinks() {
  return (tree: any) => {
    const index = getSlugIndex();
    findAndReplace(tree, [
      [
        WIKILINK_RE,
        (_match: string, bang: string, rawObjetivo: string, rawLabel?: string) => {
          const objetivo = rawObjetivo.trim();
          const texto = (rawLabel ?? rawObjetivo).trim();

          // ![[algo.jpg]] — imagen incrustada al estilo Obsidian.
          if (bang === '!' && EXTENSIONES_IMAGEN.test(objetivo)) {
            // Obsidian puede escribir la ruta con carpetas (media/foto.jpg); nos quedamos
            // con el nombre del archivo porque todas las imágenes viven en /media.
            const archivo = objetivo.split('/').pop() ?? objetivo;
            return {
              type: 'image',
              url: ruta(`/media/${archivo}`),
              alt: rawLabel?.trim() ?? '',
              data: { hProperties: { className: ['imagen-cuerpo'], loading: 'lazy' } },
            };
          }

          const tipo = index.get(objetivo) ?? index.get(slugificar(objetivo));
          if (!tipo) {
            return {
              type: 'text',
              value: texto,
              data: {
                hName: 'span',
                hProperties: {
                  className: ['wikilink-roto'],
                  title: `entrada no encontrada: ${objetivo}`,
                },
              },
            };
          }
          return {
            type: 'link',
            url: ruta(`/${tipo}/${slugificar(objetivo)}`),
            data: { hProperties: { className: ['wikilink'] } },
            children: [{ type: 'text', value: texto }],
          };
        },
      ],
    ]);
  };
}
