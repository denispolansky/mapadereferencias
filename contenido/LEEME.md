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
- **La visibilidad** es `privada` si no decís lo contrario.

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

## Publicar los cambios

Escribir en Obsidian guarda la nota en tu computadora. Para que entre al
archivo (versionado, con historia), hay que subirla. Con **GitHub Desktop**:
mirás la lista de cambios, escribís cualquier frase en el cuadro de abajo,
**Commit**, y después **Push**. No hace falta hacerlo por cada nota: podés
escribir toda la semana y subir todo junto una vez.
