import { getCollection } from 'astro:content';

export const COLECCIONES = ['ideas', 'imagenes', 'recetas', 'ingredientes', 'cronicas'] as const;
export type NombreColeccion = (typeof COLECCIONES)[number];

export const COLECCION_POR_TIPO: Record<string, NombreColeccion> = {
  idea: 'ideas',
  imagen: 'imagenes',
  receta: 'recetas',
  ingrediente: 'ingredientes',
  cronica: 'cronicas',
};

export type EntradaUnificada = {
  slug: string;
  tipo: string;
  coleccion: NombreColeccion;
  data: Record<string, any>;
  body: string;
};

let cache: EntradaUnificada[] | null = null;

export async function getTodasLasEntradas(): Promise<EntradaUnificada[]> {
  if (cache) return cache;
  const listas = await Promise.all(COLECCIONES.map((c) => getCollection(c)));
  const entradas: EntradaUnificada[] = [];
  listas.forEach((lista, i) => {
    for (const entrada of lista) {
      entradas.push({
        slug: entrada.id,
        tipo: entrada.data.tipo,
        coleccion: COLECCIONES[i],
        data: entrada.data,
        body: entrada.body ?? '',
      });
    }
  });
  cache = entradas;
  return entradas;
}

const WIKILINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export function extraerSlugsReferenciados(body: string): string[] {
  const slugs = new Set<string>();
  for (const match of body.matchAll(WIKILINK_RE)) {
    slugs.add(match[1].trim());
  }
  return [...slugs];
}

export async function getBacklinks(slug: string): Promise<EntradaUnificada[]> {
  const entradas = await getTodasLasEntradas();
  return entradas.filter((e) => extraerSlugsReferenciados(e.body).includes(slug));
}
