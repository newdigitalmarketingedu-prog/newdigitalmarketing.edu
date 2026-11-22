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
- `Admin` existe en **todas** las instituciones, con control total para editar todo. Cada Admin es una cuenta **independiente** (clave inicial `Admin`; cambiar la de una no afecta a las otras).
- `Prueba` pertenece solo a Colegio Ndm.edu.
- Los demás usuarios son **únicos por institución**: pertenecen a una sola y su nombre no se repite en otra. Se crean en *Configuración y Usuarios*.
- Los datos de cada institución son compartidos por todos sus usuarios (si un usuario crea una promoción, los demás la ven).

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

## Documentación
`docs/registro-del-chat.md` resume la conversación de diseño (hasta el 8 de noviembre de 2026) y `docs/actualizacion-2026-11-21.md` los cambios posteriores.
