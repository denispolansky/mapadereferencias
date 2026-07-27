import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
import { CARPETA_A_TIPO, slugificar } from './slugs.ts';

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

const ESTADOS = ['semilla', 'en-desarrollo', 'estable'];

function comoLista(valor: unknown): string[] {
  if (valor == null) return [];
  if (Array.isArray(valor)) return valor.map((v) => String(v).trim()).filter(Boolean);
  return String(valor)
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function elegir(valor: unknown, validos: string[], porDefecto: string): string {
  const v = String(valor ?? '').trim().toLowerCase();
  return validos.includes(v) ? v : porDefecto;
}

/** Última modificación del archivo, como fecha de respaldo cuando la entrada no
 * declara ninguna. Así una nota sin frontmatter igual se ordena de forma sensata. */
function fechaDeArchivo(filePath: unknown): Date {
  if (typeof filePath === 'string' && filePath) {
    try {
      const abs = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
      return fs.statSync(abs).mtime;
    } catch {
      /* si no se puede leer, se cae al valor de abajo */
    }
  }
  return new Date();
}

/** Completa lo que falte para que una nota escrita a las apuradas —incluso sin
 * frontmatter— sea una entrada válida. El tipo sale siempre de la carpeta. */
function normalizar(entrada: any, coleccion: NombreColeccion): EntradaUnificada {
  const datos: Record<string, any> = { ...(entrada.data ?? {}) };
  const slug = slugificar(entrada.id);
  const tipo = CARPETA_A_TIPO[coleccion];

  const fecha = datos.fecha instanceof Date ? datos.fecha : fechaDeArchivo(entrada.filePath);

  datos.tipo = tipo;
  datos.titulo = String(datos.titulo ?? '').trim() || entrada.id.replace(/-/g, ' ');
  datos.fecha = fecha;
  datos.modificado = datos.modificado instanceof Date ? datos.modificado : fecha;
  datos.estado = elegir(datos.estado, ESTADOS, 'semilla');
  datos.etiquetas = comoLista(datos.etiquetas);
  datos.imagenes = comoLista(datos.imagenes);
  datos.variedades = comoLista(datos.variedades);
  datos.tecnicas = comoLista(datos.tecnicas);

  return { slug, tipo, coleccion, data: datos, body: entrada.body ?? '' };
}

let cache: EntradaUnificada[] | null = null;

export async function getTodasLasEntradas(): Promise<EntradaUnificada[]> {
  if (cache) return cache;
  const listas = await Promise.all(COLECCIONES.map((c) => getCollection(c)));
  const entradas: EntradaUnificada[] = [];
  listas.forEach((lista, i) => {
    for (const entrada of lista) {
      entradas.push(normalizar(entrada, COLECCIONES[i]));
    }
  });
  cache = entradas;
  return entradas;
}

export async function getEntrada(slug: string): Promise<EntradaUnificada | undefined> {
  const entradas = await getTodasLasEntradas();
  return entradas.find((e) => e.slug === slug);
}

/** Toda imagen referenciada por una entrada: las del frontmatter y las
 * incrustadas en el cuerpo con la sintaxis ![[archivo]] de Obsidian. */
export function imagenesDe(entrada: EntradaUnificada): string[] {
  const delFrontmatter: string[] = [
    ...(entrada.data.archivo ? [entrada.data.archivo] : []),
    ...(entrada.data.imagenes ?? []),
  ];
  const vistas = new Set<string>();
  const resultado: string[] = [];
  for (const ruta of delFrontmatter) {
    const archivo = String(ruta).split('/').pop() ?? String(ruta);
    if (archivo && !vistas.has(archivo)) {
      vistas.add(archivo);
      resultado.push(archivo);
    }
  }
  // Las incrustadas en el cuerpo ya las renderiza el plugin de remark en su lugar,
  // así que acá solo interesan para saber si la entrada tiene imagen (ver índice).
  return resultado;
}

const EMBED_IMAGEN_RE = /!\[\[([^\]|]+?\.(?:jpe?g|png|gif|webp|avif|heic|heif|tiff?|bmp|svg))(?:\|[^\]]*)?\]\]/gi;

/** Primera imagen incrustada en el cuerpo, para usar de miniatura en el índice. */
export function primeraImagenDelCuerpo(body: string): string | null {
  const match = EMBED_IMAGEN_RE.exec(body);
  EMBED_IMAGEN_RE.lastIndex = 0;
  if (!match) return null;
  const ruta = match[1].trim();
  return ruta.split('/').pop() ?? ruta;
}

/** Miniatura de la entrada: frontmatter primero, si no la primera del cuerpo. */
export function miniaturaDe(entrada: EntradaUnificada): string | null {
  return imagenesDe(entrada)[0] ?? primeraImagenDelCuerpo(entrada.body);
}

const WIKILINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export function extraerSlugsReferenciados(body: string): string[] {
  const slugs = new Set<string>();
  for (const match of body.matchAll(WIKILINK_RE)) {
    const objetivo = match[1].trim();
    // Los embeds de imagen no son conexiones entre entradas.
    if (/\.(jpe?g|png|gif|webp|avif|heic|heif|tiff?|bmp|svg)$/i.test(objetivo)) continue;
    slugs.add(slugificar(objetivo));
  }
  return [...slugs];
}

export async function getBacklinks(slug: string): Promise<EntradaUnificada[]> {
  const entradas = await getTodasLasEntradas();
  return entradas.filter((e) => e.slug !== slug && extraerSlugsReferenciados(e.body).includes(slug));
}
