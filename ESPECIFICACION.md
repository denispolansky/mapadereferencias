# Archivo vivo — especificación del proyecto

Este documento es la memoria del proyecto. Fue elaborado en una etapa previa de investigación y definición. Las decisiones registradas acá ya fueron discutidas y tomadas: no se re-litigan salvo que se encuentre un problema técnico concreto, y en ese caso se explica el problema antes de proponer cambios.

## Qué es este proyecto

Una web personal que funciona como archivo vivo de una práctica gastronómica: mezcla de biblioteca, cuaderno de investigación, diario y archivo visual. La autora es fotógrafa, retocadora digital y estudiante de artes; su fotografía es material central del archivo, no ilustración.

No es un blog, no es un portfolio, no es un gestor de notas genérico. Es una herramienta de pensamiento: debe hacer que investigar, cocinar y documentar sea más fácil y más placentero. Cada decisión de diseño se evalúa contra esa pregunta. Si una función no la responde afirmativamente, no debe existir.

## Filosofía de trabajo

Construcción lenta y por etapas. Nunca intentar resolver todo en una versión. Cada funcionalidad nueva surge de una necesidad real ya aparecida, no de una posibilidad interesante. Preferir siempre la versión más simple que funcione. Cuando una decisión afecte el futuro del proyecto, detenerse y discutirla con la autora antes de implementar. Cuestionar sus ideas cuando exista una alternativa mejor, explicando por qué.

## Decisiones ya tomadas

1. Puerta de entrada visual, modelo "índice mixto": la home es un índice donde imágenes y texto conviven, cada entrada con la forma que le corresponde. No es una grilla pura ni una lista de texto pura.
2. Estética: austeridad tipográfica inspirada en gwern.net. Monocromo, sin decoración. Las fotografías de la autora son el único color del sitio. La página desaparece; la imagen y el texto mandan.
3. Cinco tipos de contenido: idea, imagen, receta, ingrediente, crónica. Salieron de material real, no de categorías hipotéticas.
4. El diario no es una sección: es una vista. Todo el contenido ordenado por fecha es el diario. No existe un espacio de escritura diaria separado.
5. Visibilidad por entrada: cada entrada declara si es privada o pública desde el día uno, aunque en el MVP todo funcione en local. Esto mantiene reversible la decisión público/privado.
6. Arquitectura en tres capas: entradas (contenido), conexiones (wikilinks, etiquetas, genealogías), vistas (índice, diario, colecciones, grilla, búsqueda). Las vistas nunca contienen contenido propio: son lentes sobre la capa 1.
7. Las conexiones nacen escribiendo: wikilinks dentro del texto, no formularios de administración de relaciones.
8. El archivo no es solo gastronómico: una foto de la trama de un vestido es tan válida como un fermento. El tipo "imagen" nunca exige contexto de comida. Es un archivo de una mirada, no de un tema.
9. Modelo mental: bloques a la Are.na, sin colaboradores. Cada entrada es un bloque autónomo que se entrelaza con otros mediante wikilinks y etiquetas. El proyecto es estrictamente personal: sin cuentas, sin colaboración, sin funciones sociales, nunca. En particular, una entrada de tipo imagen es siempre imagen + texto: el cuerpo Markdown acompaña a la foto con el mismo rango, puede contener wikilinks, y debe renderizarse debajo de la imagen en la página de entrada. Una imagen sin texto es válida; el texto nunca es opcional en el diseño de la plantilla.

## Decisión técnica de base (revisable solo con argumento técnico fuerte)

El contenido vive en archivos Markdown con frontmatter YAML, uno por entrada, más carpetas de imágenes y adjuntos. Sin base de datos. Razones: portabilidad a décadas (el archivo debe sobrevivir a cualquier framework), manipulación directa por Claude Code y por la autora, versionado con git como historia del archivo, cero infraestructura que mantener.

Stack sugerido: Astro como generador del sitio (excelente con contenido Markdown, colecciones de contenido tipadas, rendimiento, poco JavaScript). Si al evaluar el entorno se encuentra una razón concreta para otro stack, se plantea antes de escribir código.

Estructura de carpetas propuesta:

```
/contenido
  /ideas
  /imagenes
  /recetas
  /ingredientes
  /cronicas
/media            ← archivos de imagen, nombrados por fecha-slug
/src              ← código del sitio
```

## Modelo de contenido

Cada entrada es un archivo `.md`. El cuerpo es texto libre en Markdown y puede contener wikilinks con sintaxis `[[slug]]` o `[[slug|texto visible]]`.

Frontmatter universal (todos los tipos):

```yaml
titulo: ""
tipo: idea | imagen | receta | ingrediente | cronica
fecha: 2026-07-18          # creación
modificado: 2026-07-18     # última edición, actualizar en cada cambio
estado: semilla | en-desarrollo | estable   # madurez de la entrada
visibilidad: privada | publica
etiquetas: []
```

Campos adicionales por tipo:

```yaml
# idea
imagenes: []               # rutas a /media, referencias visuales

# imagen
archivo: ""                # ruta a /media
origen: propia | encontrada
fuente: ""                 # si es encontrada: de dónde
nota: ""                   # por qué se guardó

# receta
origen: propia | ajena
fuente: ""                 # si es ajena: libro, sitio, persona
desciende-de: ""           # slug de otra receta (genealogía), opcional
probada: 0                 # cantidad de veces
ultima-prueba: ""          # fecha, opcional
imagenes: []

# ingrediente
variedades: []
procedencia: ""            # productor, mercado, lugar
tecnicas: []               # métodos de cocción/preparación asociados
imagenes: []

# cronica
lugar: ""
fecha-visita: ""
imagenes: []
```

Principio: sobre-estructurar es un error. Si un dato no entra cómodo en estos campos, va en el cuerpo como texto. No agregar campos nuevos sin necesidad demostrada.

## Alcance del MVP (versión 1)

Incluye, en este orden de construcción:

1. Estructura del proyecto y modelo de contenido funcionando (las colecciones tipadas leen el frontmatter y validan).
2. Página de entrada individual: renderiza el cuerpo, muestra el bloque de metadatos (fecha, modificado, estado, veces probada si aplica) al estilo cabecera de gwern.net, y muestra las imágenes asociadas con protagonismo.
3. Wikilinks: `[[slug]]` se convierte en link a la entrada; cada entrada muestra al pie sus backlinks ("mencionada en:").
4. Vista índice (home): índice mixto de todas las entradas, ordenable, donde las entradas con imagen la muestran en miniatura generosa y las de texto muestran título y primeras líneas.
5. Vista diario: las mismas entradas ordenadas cronológicamente, agrupadas por mes.
6. Búsqueda simple sobre títulos, cuerpo y etiquetas (client-side está bien para el MVP).
7. Páginas de etiqueta: `/etiqueta/textura` lista todo lo etiquetado.

Explícitamente fuera del MVP (no construir aunque parezca fácil): colecciones manuales, previews al pasar sobre links, grilla de imágenes como vista separada, subida de PDFs y libros, visualización de grafo, deploy público, autenticación. Cada una entra cuando su necesidad aparece en el uso real, con una excepción acordada: las colecciones (agrupaciones manuales curadas, tipo canales de Are.na, donde una entrada puede vivir en varias a la vez) son la primera función post-MVP comprometida. Se construyen apenas el MVP esté probado con contenido real, no antes.

Criterio de terminado del MVP: la autora puede cargar sus seis primeros ítems reales (una idea con foto de referencia, tres recetas ajenas, una crónica de restaurante, una ficha de ingrediente, una foto de un textil) y navegar entre ellos siguiendo conexiones. Si eso resulta placentero, el MVP cumplió.

## Dirección visual

Referencia central: gwern.net, trasladado a un archivo donde la fotografía ocupa el lugar de la erudición. No copiar su densidad de página: acá las entradas son atómicas y cortas por defecto.

Concretamente: fondo blanco (y variante oscura si es trivial, no prioritaria), texto en una serif de calidad para el cuerpo (con buen soporte de español, justificada; evitar las elecciones por defecto), una sans o mono discreta para metadatos y navegación. Sin colores de acento: el único color del sitio son las fotografías. Sin sombras, sin degradados, sin decoración. Jerarquía por tipografía y espacio, no por cajas. Las imágenes pueden ocupar el ancho completo de la columna de lectura cuando lo merecen. El bloque de metadatos de cada entrada es un elemento de identidad: visible, ordenado, tipo ficha de laboratorio.

Antes de escribir CSS, se presenta a la autora una mini propuesta tipográfica (2–3 opciones de serif con muestra) y se la deja elegir. La tipografía es la personalidad del sitio y ella es fotógrafa: tiene ojo y criterio.

**Resuelto:** la autora eligió **Lora** para el cuerpo (autohospedada en `public/fonts/`), monoespaciada de sistema para metadatos y navegación.

## Manifiesto de diseño

Surgido de una sesión de dirección conceptual: análisis por familias de referencias (editorial — Apartamento, The Gentlewoman, Kinfolk, Aesop; archivo — Are.na, Internet Archive, Rijksmuseum, Cooper Hewitt, The Met; estudios creativos — OK-RM, Studio Airport, DIA, Common Name; gastronomía con espíritu crítico) para entender principios, no copiar estéticas. Estos diez principios guían las decisiones de diseño, arquitectura y desarrollo de acá en adelante:

1. El contenido manda; la interfaz se abstiene. Si una decisión compite por atención con una fotografía o un texto, se pierde.
2. Las fotografías son documentos, no ilustración. Se muestran en su tamaño y su contexto — nunca recortadas para "quedar lindas" en una grilla.
3. El aire es jerarquía. El espacio en blanco no es lo que sobra: es lo que ordena.
4. Cada entrada se lee como una pieza autónoma. Completa en sí misma — nunca un fragmento que depende de scrollear un feed.
5. Las conexiones se descubren, no se fuerzan. El sistema premia el camino lateral (wikilink, etiqueta, backlink) tanto como el cronológico.
6. La metadata es parte del diseño. Visible, ordenada, con la misma atención tipográfica que el cuerpo del texto.
7. El proceso vale tanto como el resultado. Una idea a medio cocinar (`semilla`) tiene tanto derecho a existir en el archivo como una receta probada diez veces.
8. Ninguna decoración que no venga del contenido. El color, si existe, lo pone la fotografía — nunca la interfaz.
9. Se diseña para crecer diez años, no para lanzarse una vez. Cada decisión se pregunta si sigue funcionando con diez veces más contenido.
10. Nunca debe sentirse como una aplicación. Si en algún momento parece Notion o Pinterest, fallamos.

**Marco mental: "mesa de trabajo", no "página web".** Navegar el archivo debe sentirse como recorrer una mesa donde conviven fotografías, libros abiertos, ingredientes y notas — asociación antes que jerarquía de menú. Esto no se traduce en skeuomorfismo (no se dibuja una mesa); se traduce en que mirar algo te lleve a otra cosa por conexión, no por estructura de carpetas. La miniatura variable del índice según `estado` ya es una primera aplicación de esta idea.

**Decisiones derivadas de esta sesión:**
- El índice se sigue ordenando por fecha por defecto, ordenable a título. No se cambia el mecanismo de "puerta de entrada" por ahora.
- Productor y libro no se convierten en tipos de contenido nuevos. Siguen como texto libre (`procedencia`, `fuente`) con wikilink informal si hace falta referenciarlos. Se reconsidera si en el uso real aparece la necesidad de citarlos como entradas propias.

## Cómo trabajar con la autora

Respuestas claras y no innecesariamente largas. Cuando haya varias opciones: compararlas, dar ventajas y desventajas, recomendar con fundamento. Construir de a un paso verificable por vez: después de cada etapa del MVP, mostrarle el resultado corriendo en local antes de seguir. Ella decide; el trabajo se propone y se cuestiona, no se impone.

## Contenido inicial de prueba

Usar contenido real de la autora, no lorem ipsum. Sus seis primeros ítems: una idea sobre un repollo con su foto de referencia; tres recetas ajenas que le interesaron; una crónica sobre una comida en el restaurante Alcnafory (menú y observaciones); una ficha de los coles que consiguió, con procedencia y métodos de cocción; una imagen de la trama de un vestido. El material concreto (archivos de imagen y textos) lo aporta ella.

**Estado actual:** las cinco entradas de `contenido/` marcadas "entrada de prueba" son placeholders para validar el esquema, no los ítems reales. Se sumaron dos entradas reales con cuerpo vacío a la espera del texto: `apple-strudel-pie` (receta ajena, fuente real) y `lygaria-kea` (crónica). Faltan las fotos correspondientes y el resto del material de los seis ítems originales.
