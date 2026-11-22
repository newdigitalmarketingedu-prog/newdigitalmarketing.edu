# New Digital Marketing.edu

Plataforma de marketing para instituciones educativas, en **un solo archivo**: `index.html`.
Ese archivo es el código fuente y también la página publicada. Se edita directamente o con el panel **Configuración** (ver más abajo).

## Publicar en GitHub Pages
1. Sube el contenido de esta carpeta a un repositorio nuevo (*Add file → Upload files*): `index.html`, `README.md`, `.gitignore` y la carpeta `docs/`.
2. En *Settings → Pages* elige *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. La plataforma queda en `https://TU-USUARIO.github.io/TU-REPOSITORIO/`. Cada institución tiene su enlace con `#`, por ejemplo `.../#maria-del-angel`.

## Qué funciona fuera de claude.ai
- **Igual:** todos los módulos, personalización por institución, edición, Google Maps, correo por Gmail, guardado en el navegador y panel Configuración.
- **No funciona (necesita backend):** la sincronización en tiempo real entre computadoras y el asistente de IA con respuestas completas. En GitHub Pages los datos de cada institución se comparten entre sus usuarios **en el mismo navegador**, no entre equipos distintos.

## Cuentas
- Cada institución tiene **sus propios usuarios y su propio equipo**, independientes de las demás.
- `Admin` existe en **todas** las instituciones, con control total para editar todo; es una cuenta independiente en cada una (clave inicial `Admin`).
- Un mismo nombre de usuario (con el mismo nombre, cargo y contraseña) **se puede crear en varias instituciones**: cada copia es una cuenta distinta, con sus propios permisos y datos. Dentro de una misma institución el usuario no se repite.
- `Prueba` pertenece solo a Colegio Ndm.edu.
- Los datos de cada institución son compartidos por todos sus usuarios (si un usuario crea una promoción, los demás de esa institución la ven).

## Panel Configuración (solo en el inicio de sesión de New Digital Marketing.edu)
Pestaña pegada al borde derecho de la pantalla.
- **Optimizar:** compacta los ajustes guardados sin cambiar el funcionamiento.
- **Volver a la versión anterior:** deshace el último cambio.
- **Instituciones:** agregar, quitar y renombrar. Al subir un logo, el sistema lee sus colores y tiñe el inicio de sesión y toda la plataforma.
- **Mejora:** instrucciones en español que se aplican solas, sin internet ni Claude. Cubre módulos (agregar apartados, tablas y enlaces; renombrar; ocultar o mostrar; mover) y diseño (colores, fondo, letra, tamaño, bordes, sombras, modo oscuro, CSS propio). Cada mejora sube la versión (`v. 0.0.N`, abajo a la derecha).
- Los ajustes se guardan en `localStorage` (clave `ndm:sys`) y se vuelven a aplicar al abrir la página.
- El panel es visible para cualquiera que abra ese inicio de sesión (sin contraseña).

## Otros detalles
- Al cerrar sesión se muestra el color de la institución con su logo y luego el inicio de sesión.
- Los datos se guardan por institución: `ndm:data:<institución>`.

## Estructura del código (src/)
`index.html` es el archivo que se publica (todo en uno). Su código fuente está ordenado en `src/`:
- `src/index.template.html`: estructura de la página; indica en qué orden se carga cada archivo.
- `src/css/`: estilos numerados (`01-base`, `02-glass`, `10-modulos`, `20-configuracion-tema`).
- `src/js/`: scripts numerados por función (`00-arranque-oauth`, `05-logos`, `10-nucleo-app`, `11-edicion-usuarios-ia`, … `20-configuracion-mejora-pin`). El orden importa: cada archivo usa lo definido por los anteriores.
- Para regenerar `index.html` después de editar `src/`: `python3 build.py` (requiere Python 3 y Node para validar la sintaxis). Con `--min` además compacta CSS y JS si hay `esbuild` instalado.

## Documentación
`docs/registro-del-chat.md` resume la conversación de diseño (hasta el 8 de noviembre de 2026) y `docs/actualizacion-2026-11-21.md` los cambios posteriores.
