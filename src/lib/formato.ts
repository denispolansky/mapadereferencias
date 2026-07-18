export function formatearFecha(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

/** Las entradas guardan rutas de imagen relativas a /media (ver frontmatter). */
export function rutaMedia(ruta: string): string {
  if (/^https?:\/\//.test(ruta) || ruta.startsWith('/')) return ruta;
  return `/media/${ruta}`;
}

/** Tiempo relativo en español, para la línea de "archivo vivo" del índice. */
export function tiempoRelativo(fecha: Date, ahora = new Date()): string {
  const dias = Math.floor((ahora.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));
  if (dias <= 0) return 'hoy';
  if (dias === 1) return 'ayer';
  if (dias < 7) return `hace ${dias} días`;
  if (dias < 30) {
    const semanas = Math.floor(dias / 7);
    return `hace ${semanas} ${semanas === 1 ? 'semana' : 'semanas'}`;
  }
  if (dias < 365) {
    const meses = Math.floor(dias / 30);
    return `hace ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  }
  const anios = Math.floor(dias / 365);
  return `hace ${anios} ${anios === 1 ? 'año' : 'años'}`;
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
