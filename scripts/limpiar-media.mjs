/** Borra de contenido/media las imágenes que ninguna entrada menciona.
 *
 * Se corre antes de publicar. Cuando se elimina una entrada (o se le saca una
 * foto), su imagen queda huérfana: nadie la muestra, pero sigue ocupando lugar
 * en el archivo. Esto la limpia sola.
 *
 * Criterio deliberadamente conservador: una imagen se considera EN USO si su
 * nombre aparece en cualquier parte de cualquier .md — en el cuerpo como
 * ![[foto.jpg]], en el frontmatter como imagenes/archivo, o citada de cualquier
 * otra forma. Ante la duda, no se borra.
 *
 * Las imágenes borradas quedan igual en la historia de git, así que siempre se
 * pueden recuperar.
 */
import fs from 'node:fs';
import path from 'node:path';

const CONTENIDO = 'contenido';
const MEDIA = path.join(CONTENIDO, 'media');

/** Todos los .md del archivo, sin entrar a la carpeta de imágenes. */
function marcadores(dir) {
  const encontrados = [];
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entrada.name.startsWith('.')) continue;
    const completo = path.join(dir, entrada.name);
    if (entrada.isDirectory()) {
      if (path.resolve(completo) === path.resolve(MEDIA)) continue;
      encontrados.push(...marcadores(completo));
    } else if (entrada.name.endsWith('.md')) {
      encontrados.push(completo);
    }
  }
  return encontrados;
}

if (!fs.existsSync(MEDIA)) {
  console.log('No hay carpeta de imágenes; nada que limpiar.');
  process.exit(0);
}

const archivosMd = marcadores(CONTENIDO);

// Red de seguridad: si no se encontró ni un .md, algo anda mal (¿ruta
// equivocada?) y borrar todo sería catastrófico. Mejor no tocar nada.
if (archivosMd.length === 0) {
  console.log('No se encontró ninguna entrada. Por las dudas, no se borra nada.');
  process.exit(0);
}

const texto = archivosMd.map((f) => fs.readFileSync(f, 'utf8')).join('\n');

const imagenes = fs
  .readdirSync(MEDIA, { withFileTypes: true })
  .filter((e) => e.isFile() && !e.name.startsWith('.'))
  .map((e) => e.name);

const huerfanas = imagenes.filter((nombre) => !texto.includes(nombre));

if (huerfanas.length === 0) {
  console.log(`Sin imágenes huérfanas (${imagenes.length} en uso).`);
  process.exit(0);
}

for (const nombre of huerfanas) {
  fs.unlinkSync(path.join(MEDIA, nombre));
  console.log(`Borrada (ninguna entrada la usaba): ${nombre}`);
}
console.log(`\n${huerfanas.length} imagen(es) huérfana(s) eliminada(s).`);
