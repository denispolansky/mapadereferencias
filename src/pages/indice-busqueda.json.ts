import type { APIRoute } from 'astro';
import { getTodasLasEntradas } from '../lib/entradas';
import { extracto } from '../lib/formato';

export const GET: APIRoute = async () => {
  const entradas = await getTodasLasEntradas();
  const indice = entradas.map((e) => ({
    slug: e.slug,
    tipo: e.tipo,
    titulo: e.data.titulo as string,
    etiquetas: (e.data.etiquetas ?? []) as string[],
    extracto: extracto(e.body, 160),
    texto: `${e.data.titulo} ${(e.data.etiquetas ?? []).join(' ')} ${e.body}`.toLowerCase(),
  }));
  return new Response(JSON.stringify(indice), {
    headers: { 'Content-Type': 'application/json' },
  });
};
