# New Digital Marketing.edu

Plataforma de marketing para instituciones educativas, en **un solo archivo**: `index.html`.
Ese archivo es el código fuente y también la página publicada. Se edita directamente o con el panel **Configuración** (ver más abajo).

## Sincronización entre computadoras y usuarios
Todo se comparte en la nube: **todos los módulos**, las **cuentas y permisos**, la **configuración del sistema** (instituciones, logos, mejoras, diseño) y el registro/tiempo de uso. Lo que un usuario configura lo ven los demás usuarios de su institución en cualquier computadora; lo que Admin configura lo ven también los usuarios nuevos que cree.

La plataforma elige sola la base de datos:
1. **Abierta desde claude.ai** (artefacto): usa la base de datos del artefacto. Para que otra persona pueda guardar cambios, compártele la página con permiso de **Colaborador** o **Editor** (con «Ver» solo puede mirar).
2. **Abierta desde GitHub Pages u otro hosting**: usa **Firebase (Firestore)**, gratis. Se configura una sola vez siguiendo **`FIREBASE.md`**: crear el proyecto, pegar las reglas de `firestore.rules`, activar el acceso Anónimo y completar **`firebase-config.js`**. Desde ese momento todas las computadoras quedan conectadas.
   - Alternativa: ⚙ Configuración → **Conexión entre computadoras** → pegar la configuración → **Conectar** (solo ese navegador) → **Descargar index.html conectado**.
3. Sin ninguna de las dos, los datos quedan solo en ese navegador.

Abajo a la izquierda un indicador muestra el estado: **☁ Sincronizado**, **⚠ Solo este equipo** o **⚠ Sin permiso para guardar en la nube**.

Detalles técnicos: todo pasa por `ndmDB()` (primer `<script>`). Los documentos de más de 80 000 caracteres (logos, imágenes, chats largos) se guardan en partes (`clave~0`, `clave~1`, …) y se vuelven a unir al leer, para no chocar con el límite de tamaño por documento. Colecciones: `g_cfg/accounts` (cuentas y permisos), `g_cfg/system` (configuración del sistema), `i_<institución>` (datos de los módulos), `x_<institución>` y `u_<institución>` (memoria del asistente, registro y tiempo por usuario).

## Archivos
| Archivo | Para qué sirve |
|---|---|
| `index.html` | La plataforma completa (todo en uno). |
| `firebase-config.js` | Datos de conexión con Firebase. **Es el único archivo que debes completar.** |
| `firestore.rules` | Reglas de seguridad de la base de datos (se pegan en Firebase). |
| `FIREBASE.md` | Paso a paso para crear y conectar Firebase. |
| `firebase.json`, `.firebaserc` | Solo si publicas con Firebase Hosting en vez de GitHub Pages. |
| `.nojekyll`, `.gitignore` | Ajustes de GitHub. |

## Publicar en GitHub Pages
1. Crea un repositorio nuevo y sube **todos** los archivos (*Add file → Upload files*; arrastra también `.nojekyll`, `.gitignore` y `.firebaserc`).
2. En *Settings → Pages* elige *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. La plataforma queda en `https://TU-USUARIO.github.io/TU-REPOSITORIO/`. Cada institución tiene su enlace con `#`, por ejemplo `.../#maria-del-angel`.
4. Completa `firebase-config.js` (ver `FIREBASE.md`) para que todo se comparta entre computadoras.

## Qué funciona fuera de claude.ai
- **Igual:** todos los módulos, personalización por institución, edición, Google Maps, correo por Gmail, panel Configuración y, con Firebase, la sincronización entre computadoras y usuarios.
- **No funciona:** el asistente de IA con respuestas completas (necesita claude.ai).

## Cuentas
- Cada institución tiene **sus propios usuarios y su propio equipo**, independientes de las demás.
- `Admin` existe en **todas** las instituciones, con control total para editar todo; es una cuenta independiente en cada una (clave inicial `Admin`).
- Un mismo nombre de usuario (con el mismo nombre, cargo y contraseña) **se puede crear en varias instituciones**: cada copia es una cuenta distinta, con sus propios permisos y datos. Dentro de una misma institución el usuario no se repite.
- `Prueba` pertenece solo a Colegio Ndm.edu.
- Los datos de cada institución son compartidos por todos sus usuarios, en todas las computadoras.

## Panel Configuración (solo en el inicio de sesión de New Digital Marketing.edu)
Pestaña pegada al borde derecho de la pantalla.
- **Optimizar:** compacta los ajustes guardados sin cambiar el funcionamiento.
- **Volver a la versión anterior:** deshace el último cambio.
- **Instituciones:** agregar, quitar y renombrar. Al subir un logo, el sistema lee sus colores y tiñe el inicio de sesión y toda la plataforma.
- **Mejora:** instrucciones en español que se aplican solas, sin internet ni Claude. Cada mejora sube la versión (`v. 0.0.N`, abajo a la derecha).
- **Conexión entre computadoras:** estado de la sincronización y conexión con Firebase.
- Los ajustes se guardan en el navegador (`ndm:sys`) y en la nube (`g_cfg/system`), y se vuelven a aplicar al abrir la página.
- El panel es visible para cualquiera que abra ese inicio de sesión (sin contraseña).

## Otros detalles
- Al cerrar sesión se muestra el color de la institución con su logo y luego el inicio de sesión.
- Copia local por institución: `ndm:data:<institución>`.
- Las contraseñas de la plataforma se guardan sin cifrar en la base de datos compartida: no reutilices contraseñas importantes.

## Estructura del código (src/)
`index.html` es el archivo que se publica (todo en uno). Su código fuente está ordenado en `src/` (`index.template.html`, `css/`, `js/`) y se regenera con `python3 build.py`.
- **Importante:** la capa de nube (`ndmDB()`, primer `<script>` de `index.html`, y la carga de `firebase-config.js` justo antes) se agregó el 23-11-2026 directamente en `index.html`. Antes de regenerar desde `src/`, copia ese bloque a un archivo `src/js/` que cargue primero, o se perderá la sincronización.

## Documentación
`docs/registro-del-chat.md` resume la conversación de diseño (hasta el 8 de noviembre de 2026) y `docs/actualizacion-2026-11-21.md` los cambios posteriores.
