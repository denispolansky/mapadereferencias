import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { slugificar } from './lib/slugs.ts';

/** Principio: el contenido nunca rompe el sitio.
 * Todos los campos son opcionales y tolerantes — si falta uno, o viene con otra
 * forma (un texto donde se esperaba una lista), el valor se completa o se
 * normaliza después, en lib/entradas.ts. El tipo sale de la carpeta, no del
 * frontmatter, así mover una nota de carpeta alcanza para recategorizarla. */

const textoOLista = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .catch(undefined);

const fecha = z.coerce.date().optional().catch(undefined);

const campoUniversal = {
  titulo: z.string().optional().catch(undefined),
  tipo: z.string().optional().catch(undefined),
  fecha,
  modificado: fecha,
  estado: z.string().optional().catch(undefined),
  visibilidad: z.string().optional().catch(undefined),
  etiquetas: textoOLista,
  imagenes: textoOLista,
  // Campos propios de algún tipo. Se aceptan en cualquiera: si no corresponden,
  // simplemente no se muestran, en vez de invalidar la entrada.
  archivo: z.string().optional().catch(undefined),
  origen: z.string().optional().catch(undefined),
  fuente: z.string().optional().catch(undefined),
  nota: z.string().optional().catch(undefined),
  'desciende-de': z.string().optional().catch(undefined),
  probada: z.coerce.number().optional().catch(undefined),
  'ultima-prueba': fecha,
  variedades: textoOLista,
  procedencia: z.string().optional().catch(undefined),
  tecnicas: textoOLista,
  lugar: z.string().optional().catch(undefined),
  'fecha-visita': fecha,
};

const esquema = z.object(campoUniversal).passthrough();

function coleccion(carpeta: string) {
  return defineCollection({
    loader: glob({
      pattern: '**/*.md',
      base: `./contenido/${carpeta}`,
      // El id (y por lo tanto la URL) sale del nombre del archivo, slugificado:
      // "Repollo asado.md" -> repollo-asado. Nombrar las notas en prosa está bien.
      generateId: ({ entry }) => slugificar(entry.replace(/\.md$/, '').split('/').pop() ?? entry),
    }),
    schema: esquema,
  });
}

export const collections = {
  ideas: coleccion('ideas'),
  imagenes: coleccion('imagenes'),
  recetas: coleccion('recetas'),
  ingredientes: coleccion('ingredientes'),
  cronicas: coleccion('cronicas'),
};
