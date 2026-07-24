# Cómo agregar entradas al archivo (con Obsidian)

Esta carpeta (`contenido/`) es el archivo. Cada entrada es un archivo de texto.
No hay botón de "subir": escribís un archivo y eso *es* la entrada. Obsidian es
sólo un editor cómodo por encima de estos archivos — el sitio lee exactamente lo
mismo que ves acá.

## Abrir el vault

En Obsidian: **Open folder as vault** → elegí esta carpeta `contenido`.
(No abras la carpeta del proyecto entera; sólo `contenido`.)

La primera vez, andá a **Settings → Core plugins** y asegurate de que
**Templates** esté encendido. La configuración de la carpeta de plantillas y de
los `[[wikilinks]]` ya viene lista.

## La regla de oro: el nombre del archivo es el "slug"

El nombre del archivo (sin `.md`) es el identificador de la entrada y lo que va
en los wikilinks y en la URL. Por eso:

- **Nombralo en minúsculas, con guiones, sin espacios ni acentos.**
  Ej: `strudel-de-manzana.md`, `repollo-de-otono.md`, `trama-de-vestido.md`.
- El título "lindo" (con mayúsculas, acentos, lo que quieras) va **adentro**, en
  el campo `titulo:`. Eso es lo que se muestra.
- No repitas el mismo nombre de archivo en dos carpetas distintas: los slugs son
  únicos en todo el archivo.

## Crear una entrada

1. Entrá a la carpeta del tipo que corresponda: `ideas/`, `imagenes/`,
   `recetas/`, `ingredientes/` o `cronicas/`.
2. Creá una nota nueva ahí y nombrala con el slug (ver regla de oro).
3. Con la nota vacía abierta: **Cmd/Ctrl+P → "Templates: Insert template"** y
   elegí la plantilla del tipo. Se completa el encabezado con la fecha de hoy.
4. Rellená los campos y escribí el cuerpo debajo del bloque `---`.

Los cinco tipos: **idea, imagen, receta, ingrediente, crónica**. Cada uno tiene
su plantilla en `_plantillas/`.

## Conectar entradas (wikilinks)

Escribí `[[` y Obsidian te autocompleta con las entradas existentes. Funciona
igual en el sitio: se convierte en un enlace, y la entrada enlazada muestra al
pie "mencionada en" con quién la nombró.

- `[[strudel-de-manzana]]` → enlace usando el slug.
- `[[strudel-de-manzana|el strudel de la abuela]]` → enlace con texto visible
  distinto.

Si el slug todavía no existe, en el sitio aparece en gris (enlace "roto") hasta
que crees esa entrada. Es una forma válida de dejar semillas.

## Imágenes

Las imágenes **no** van dentro de Obsidian: van en la carpeta `media/` del
proyecto (al lado de `contenido/`). El flujo:

1. Copiá el archivo a `media/`. Convención de nombre: `fecha-slug.jpg`
   (ej. `2026-07-24-repollo.jpg`).
2. Referencialo por su nombre en el encabezado, **no** con `![[ ]]`:
   - tipo **imagen**: `archivo: "2026-07-24-repollo.jpg"`
   - los demás tipos: `imagenes: ["2026-07-24-repollo.jpg"]`

Obsidian no va a previsualizar esas imágenes (no sabe de `media/`), pero el sitio
sí las muestra.

## Etiquetas

En el campo `etiquetas`, como lista: `etiquetas: ["dulce", "otoño"]`.
Cada etiqueta genera su propia página (`/etiqueta/dulce`).

## Campos rápidos

- `estado`: `semilla` (idea cruda) · `en-desarrollo` · `estable`. Todo tiene
  derecho a existir desde `semilla`.
- `visibilidad`: `privada` o `publica`. Por ahora todo corre en privado; el
  campo mantiene la decisión lista para cuando publiquemos.
- `fecha`: cuándo la creaste (la pone la plantilla).
- `modificado`: actualizala cuando edites en serio la entrada.

## Ver el resultado

En una terminal, dentro del proyecto: `npm run dev`, y abrí
`http://localhost:4321`. Se actualiza solo mientras escribís.
Si no querés tocar la terminal, escribí tranquila en Obsidian y pedime que lo
levante o lo publique.

## Guardar en el archivo (git)

Escribir en Obsidian guarda el archivo en tu disco. Para que quede versionado en
la historia del archivo (y, más adelante, publicado), hay que hacer un "commit".
Por ahora, cuando tengas un puñado de entradas listas, avisame y lo subo yo. Si
te querés animar sola: `git add .` → `git commit -m "nuevas entradas"` →
`git push`.
