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

let cache: Map<string, string> | null = null;

/** Mapa slug -> tipo, construido escaneando /contenido. No usa el content layer
 * de Astro porque el plugin de remark corre antes de que esa capa esté disponible. */
export function getSlugIndex(): Map<string, string> {
  if (cache) return cache;
  const index = new Map<string, string>();
  for (const carpeta of Object.keys(CARPETA_A_TIPO)) {
    const dir = path.join(CONTENIDO_DIR, carpeta);
    if (!fs.existsSync(dir)) continue;
    for (const archivo of fs.readdirSync(dir)) {
      if (!archivo.endsWith('.md')) continue;
      index.set(archivo.replace(/\.md$/, ''), CARPETA_A_TIPO[carpeta]);
    }
  }
  cache = index;
  return index;
}

export function invalidateSlugIndex(): void {
  cache = null;
}
