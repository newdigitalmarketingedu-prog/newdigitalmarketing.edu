# New Digital Marketing.edu

Plataforma web de marketing para instituciones educativas. Es un solo archivo HTML (`index.html`); aquí está el mismo código separado en partes para leerlo y mantenerlo. `index.html` es **idéntico, carácter por carácter**, a la versión actual.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo y sube **todo el contenido de esta carpeta** (*Add file → Upload files*). Incluye el archivo oculto `.nojekyll`.
2. En *Settings → Pages* elige *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. La plataforma queda en `https://TU-USUARIO.github.io/TU-REPOSITORIO/`. Cada institución tiene su enlace con `#`, por ejemplo `.../#maria-del-angel`.

### Qué cambia fuera de claude.ai
- **Funciona igual:** módulos, personalización por institución, edición, Google Maps, correo por Gmail y guardado en el navegador.
- **No funciona (necesita backend):** la sincronización entre usuarios y computadoras (datos de la institución, cuentas, memoria de la IA) y el asistente de IA con respuestas completas. En GitHub Pages cada navegador guarda sus propios datos y la IA responde en modo sin conexión.
- Para activarlas hay que conectar una base de datos real (por ejemplo Supabase) y un modelo de IA con una clave guardada en un servidor.

## Cómo armar la página
    python3 build.py
Une los archivos de `src/` en el orden de `src/index.template.html` y genera `index.html` en la raíz. Si editas algo en `src/`, vuelve a ejecutarlo antes de subir.

## Orden de carga (no cambiar: cada archivo usa lo que definió el anterior)
### Estilos (`src/css`)
| Archivo | Contenido |
|---|---|
| 01-estilos.css | 12 KB · empieza con `:root{--red:#FC3030;--red2:#D92020;--bg:#fff;--sb:#f6f6` |
| 02-estilos.css | 3 KB · empieza con `/* ===== Glassmorphism ===== */` |
| 03-estilos.css | 1 KB · empieza con `#ndmlink{opacity:.1!important}` |
| 04-estilos.css | 0 KB · empieza con `input[type=checkbox]{-webkit-appearance:none;appearance` |
| 05-estilos.css | 0 KB · empieza con `button[title="Editar"],button[title="Eliminar"],button[` |
| 06-estilos.css | 1 KB · empieza con `.cncard .btn{width:150px!important;display:block!import` |
| 07-estilos.css | 0 KB · empieza con `.mt th:nth-child(2),.mt th:nth-child(3),.mt td:nth-chil` |
| 08-estilos.css | 0 KB · empieza con `#login .scene,#login .world{transform:translateZ(0)}` |
| 09-estilos.css | 0 KB · empieza con `input[type=number]{-moz-appearance:textfield;appearance` |
### Scripts (`src/js`)
| Archivo | Contenido |
|---|---|
| 01-codigo.js | 374 KB · empieza con `const S={` |
| 02-codigo.js | 28 KB · empieza con `/* ===== Actualización: edición, seguimiento, usuarios,` |
| 03-codigo.js | 46 KB · empieza con `(function(){` |
| 04-codigo.js | 16 KB · empieza con `(function(){` |
| 05-codigo.js | 11 KB · empieza con `(function(){` |
| 06-codigo.js | 2 KB · empieza con `/* ---- ATL con Google Maps ---- */` |
| 07-codigo.js | 3 KB · empieza con `/* ---- Sincronización en tiempo real entre todos los u` |
| 08-codigo.js | 0 KB · empieza con `addEventListener('pageshow',function(e){if(e.persisted)` |
| 09-codigo.js | 8 KB · empieza con `/* ===== Metas de matrícula independientes por mes ====` |
| 10-codigo.js | 7 KB · empieza con `(function(){` |

## Aviso
Varios scripts redefinen funciones de los anteriores (por ejemplo `V.redes`, `V.camp`, `V.crm`). Por eso **no se debe cambiar el orden**. Fusionarlos en una sola versión por módulo es un trabajo aparte que requiere pruebas.

## Documentación
`docs/registro-del-chat.md` resume las decisiones del proyecto.
