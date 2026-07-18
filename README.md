# archivo vivo

Ver `contenido/` para el modelo de contenido — ver la especificación del proyecto para el detalle completo.

## Correr en local

```
npm install
npm run dev
```

Abre `http://localhost:4321`.

## Estructura

- `contenido/` — entradas en Markdown, una carpeta por tipo (ideas, imagenes, recetas, ingredientes, cronicas).
- `media/` — archivos de imagen referenciados desde el frontmatter (`archivo`, `imagenes`).
- `src/content.config.ts` — esquema de cada tipo de entrada.
- `src/lib/remark-wikilinks.ts` — convierte `[[slug]]` en enlaces.
- `src/lib/entradas.ts` — helpers para leer todas las entradas y calcular backlinks.
- `src/pages/[tipo]/[slug].astro` — página de entrada individual.
- `src/pages/index.astro` — índice mixto (home).
- `src/pages/diario.astro` — vista diario.
- `src/pages/buscar.astro` — búsqueda simple.
- `src/pages/etiqueta/[etiqueta].astro` — página por etiqueta.

## Estado

Las cinco entradas en `contenido/` son de prueba (marcadas "entrada de prueba"), solo para validar que el esquema funciona. Faltan reemplazarlas por los seis ítems reales. La tipografía todavía no está decidida — el sitio usa una fuente de sistema como placeholder.
