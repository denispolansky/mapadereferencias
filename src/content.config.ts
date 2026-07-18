import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const campoUniversal = {
  titulo: z.string(),
  fecha: z.coerce.date(),
  modificado: z.coerce.date(),
  estado: z.enum(['semilla', 'en-desarrollo', 'estable']),
  visibilidad: z.enum(['privada', 'publica']),
  etiquetas: z.array(z.string()).default([]),
};

const ideas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './contenido/ideas' }),
  schema: z.object({
    ...campoUniversal,
    tipo: z.literal('idea'),
    imagenes: z.array(z.string()).default([]),
  }),
});

const imagenes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './contenido/imagenes' }),
  schema: z.object({
    ...campoUniversal,
    tipo: z.literal('imagen'),
    archivo: z.string(),
    origen: z.enum(['propia', 'encontrada']),
    fuente: z.string().optional(),
    nota: z.string().optional(),
  }),
});

const recetas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './contenido/recetas' }),
  schema: z.object({
    ...campoUniversal,
    tipo: z.literal('receta'),
    origen: z.enum(['propia', 'ajena']),
    fuente: z.string().optional(),
    'desciende-de': z.string().optional(),
    probada: z.number().default(0),
    'ultima-prueba': z.coerce.date().optional(),
    imagenes: z.array(z.string()).default([]),
  }),
});

const ingredientes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './contenido/ingredientes' }),
  schema: z.object({
    ...campoUniversal,
    tipo: z.literal('ingrediente'),
    variedades: z.array(z.string()).default([]),
    procedencia: z.string().optional(),
    tecnicas: z.array(z.string()).default([]),
    imagenes: z.array(z.string()).default([]),
  }),
});

const cronicas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './contenido/cronicas' }),
  schema: z.object({
    ...campoUniversal,
    tipo: z.literal('cronica'),
    lugar: z.string().optional(),
    'fecha-visita': z.coerce.date().optional(),
    imagenes: z.array(z.string()).default([]),
  }),
});

export const collections = { ideas, imagenes, recetas, ingredientes, cronicas };
