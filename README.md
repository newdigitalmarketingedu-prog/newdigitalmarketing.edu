# New Digital Marketing.edu — sistema y base de datos

Exportado: 21/11/2026, 10:26:12 p. m. · Versión v. 0.0.1

## Contenido
- `index.html`: toda la plataforma (todas las instituciones) en un solo archivo, con la base de datos incluida.
- `base-de-datos.json`: copia legible, tal cual está hoy, de todas las instituciones: usuarios creados (con rol, permisos y clave), configuración, datos de cada módulo, mejoras y diseño. La sección almacenamiento es la que se restaura sola.

## Cómo moverlo a otro servidor o a GitHub
1. Sube `index.html` a tu servidor, a un repositorio de GitHub (activa GitHub Pages) o a cualquier hosting de archivos estáticos.
2. Abre la página en el nuevo lugar: la primera vez, la base de datos incluida en `index.html` se carga sola en ese navegador.
3. Guarda `base-de-datos.json` como respaldo (contiene contraseñas de las cuentas: no lo publiques en un repositorio público).

## Importante
- Los datos se guardan en el navegador de cada persona. La sincronización en tiempo real entre equipos depende de la plataforma donde la publiques.
- Para volver a exportar, entra como Admin a Colegio Ndm.edu › Configuración y Usuarios › «Descargar sistema y base de datos de instituciones».
