import fs from 'node:fs';
import path from 'node:path';

const CONTENIDO_DIR = path.resolve(process.cwd(), 'contenido');

export const CARPETA_A_TIPO: Record<string, string> = {
  ideas: 'idea',
  imagenes: 'imagen',
  recetas: 'receta',
  ingredientes: 'ingrediente',
  cronicas: 'cronica',
};

/** Nombre de archivo -> slug para URL. Tolera mayúsculas, espacios y acentos,
 * para que la autora pueda nombrar las notas como le salga natural. */
export function slugificar(nombre: string): string {
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

let cache: Map<string, string> | null = null;

/** Mapa slug -> tipo, construido escaneando /contenido. No usa el content layer
 * de Astro porque el plugin de remark corre antes de que esa capa esté disponible.
 * Indexa cada entrada bajo su slug y bajo su nombre original, así un wikilink
 * escrito como [[Repollo asado]] resuelve igual que [[repollo-asado]]. */
export function getSlugIndex(): Map<string, string> {
  if (cache) return cache;
  const index = new Map<string, string>();
  for (const carpeta of Object.keys(CARPETA_A_TIPO)) {
    const dir = path.join(CONTENIDO_DIR, carpeta);
    if (!fs.existsSync(dir)) continue;
    for (const archivo of fs.readdirSync(dir)) {
      if (!archivo.endsWith('.md')) continue;
      const nombre = archivo.replace(/\.md$/, '');
      const tipo = CARPETA_A_TIPO[carpeta];
      index.set(slugificar(nombre), tipo);
      index.set(nombre, tipo);
    }
  }
  cache = index;
  return index;
}

export function invalidateSlugIndex(): void {
  cache = null;
}
