/** El sitio se publica en https://denispolansky.github.io/mapadereferencias/,
 * o sea colgando de una subcarpeta y no de la raíz del dominio. Todos los
 * enlaces internos tienen que llevar ese prefijo.
 *
 * Si algún día se le pone un dominio propio (archivo.tudominio.com), esto pasa
 * a ser '' y hay que cambiar `base` en astro.config.mjs. Es el único lugar. */
export const BASE = '/mapadereferencias';

/** Prefija una ruta interna del sitio. `ruta('/idea/repollo')` -> '/mapadereferencias/idea/repollo' */
export function ruta(destino: string): string {
  const limpio = destino.startsWith('/') ? destino : `/${destino}`;
  return `${BASE}${limpio}`;
}
