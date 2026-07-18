export function formatearFecha(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

/** Las entradas guardan rutas de imagen relativas a /media (ver frontmatter). */
export function rutaMedia(ruta: string): string {
  if (/^https?:\/\//.test(ruta) || ruta.startsWith('/')) return ruta;
  return `/media/${ruta}`;
}

/** Extracto de texto plano para vistas de índice: saca frontmatter de markdown
 * (encabezados, énfasis, wikilinks) y corta a un largo legible. */
export function extracto(body: string, maxCaracteres = 220): string {
  const plano = body
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s*/gm, '')
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (plano.length <= maxCaracteres) return plano;
  return plano.slice(0, maxCaracteres).replace(/\s+\S*$/, '') + '…';
}
