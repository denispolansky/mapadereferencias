# Cómo agregar entradas al archivo

Regla general: **escribí como te salga.** El sitio se adapta a la nota, no al
revés. Nada de lo que sigue es obligatorio; si algo falta, se completa solo.

## Lo mínimo que hay que hacer

1. Creá una nota dentro de la carpeta del tipo que corresponda: `ideas/`,
   `imagenes/`, `recetas/`, `ingredientes/` o `cronicas/`.
2. Escribí.

Eso es todo. Una nota con solo texto ya es una entrada válida y aparece en el
índice.

## Lo que se completa solo

- **El título** sale del nombre del archivo, si no ponés uno.
- **El tipo** sale de la carpeta donde está la nota. Si movés una nota de
  `ideas/` a `recetas/`, pasa a ser receta. No hay que tocar nada más.
- **La fecha** es la del archivo, si no declarás otra.
- **El estado** es `semilla` si no decís lo contrario.

Podés nombrar las notas como quieras: "Repollo asado.md" funciona igual que
"repollo-asado.md" (la dirección web se ordena sola).

## Imágenes: arrastrá y listo

Arrastrá la foto sobre el cuerpo de la nota. Obsidian la guarda e inserta una
línea `![[foto.jpg]]`. **Dejala ahí** — el sitio la muestra en ese mismo lugar
del texto. No hay que copiar el nombre a ningún lado.

Si querés que una foto salga arriba de todo, como imagen principal, en vez de
en medio del texto, ponela en el encabezado: `imagenes: ["foto.jpg"]`. Pero no
hace falta: si no lo hacés, la primera foto del cuerpo se usa igual como
miniatura en el índice.

## Conectar entradas

Escribí `[[` y Obsidian te autocompleta. En el sitio se convierte en un enlace,
y la entrada enlazada muestra al pie "mencionada en" con quién la nombró.

- `[[Repollo asado]]` — funciona escrito tal cual, con mayúsculas y espacios.
- `[[Repollo asado|ese repollo quemado]]` — enlace con otro texto visible.

Si la entrada todavía no existe, queda en gris hasta que la crees. Es una forma
válida de dejar semillas.

## Las propiedades aparecen solas

Con el complemento **Templater** instalado, cada nota nueva arranca con las
propiedades del tipo que corresponde a su carpeta: creás una nota en `recetas/`
y ya viene con `tipo: receta`, `estado` y `etiquetas` listos para completar.

Para instalarlo, una sola vez: Obsidian → **Configuración** → **Complementos de
la comunidad** → **Explorar** → buscar **"Templater"** → **Instalar** →
**Activar**. La configuración ya está puesta en este archivo.

Igual son opcionales: una nota sin propiedades se publica lo mismo.

## Si querés precisar más

Todos estos campos son opcionales. Se escriben en el encabezado (el bloque
entre `---` de arriba de todo), y Obsidian los muestra como "Propiedades":

- `titulo` — si querés uno distinto al nombre del archivo.
- `etiquetas` — lista; cada una genera su página (`/etiqueta/dulce`).
- `estado` — `semilla`, `en-desarrollo` o `estable`.
- `fuente` — de dónde salió (libro, sitio, persona, cuenta de Instagram).
- `origen` — `propia` o `ajena` / `encontrada`.
- `nota` — por qué la guardaste.
- `lugar`, `procedencia`, `variedades`, `tecnicas`, `probada` — según el tipo.

Un error de tipeo acá no rompe nada: si un campo no se entiende, se ignora y la
entrada se publica igual.

## Publicar los cambios (automático)

Con el complemento **Git** instalado en Obsidian, no hay que hacer nada: cada
10 minutos guarda y sube lo que hayas escrito, en silencio. Al abrir Obsidian
también baja lo que haya de nuevo.

Para instalarlo, una sola vez:

1. Obsidian → **Configuración** (el engranaje) → **Complementos de la
   comunidad** → desactivar el modo restringido si lo pide.
2. **Explorar** → buscar **"Git"** (el de Vinzent03) → **Instalar** → **Activar**.
3. Listo. La configuración ya viene puesta en este archivo, no hay que tocar
   nada más.

Abajo a la derecha, en la barra de estado, vas a ver cuándo sincronizó por
última vez. Si querés forzar una subida sin esperar: `Cmd+P` → "Git: Commit
and sync".

Si algún día algo se traba y aparece un aviso de conflicto, no pelees con eso:
avisame y lo resuelvo yo.
