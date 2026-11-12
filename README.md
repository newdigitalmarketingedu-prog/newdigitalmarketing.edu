# New Digital Marketing.edu — código organizado

La plataforma publicada es un solo archivo HTML. Aquí está el mismo código separado por partes para que sea fácil de leer y mantener.
El archivo `index.html` de la raíz es **idéntico, carácter por carácter**, a la página publicada.

## Publicar en GitHub Pages
1. Sube **todo el contenido de esta carpeta** a un repositorio nuevo (botón *Add file → Upload files*).
2. En *Settings → Pages* elige *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. La plataforma queda en `https://TU-USUARIO.github.io/TU-REPOSITORIO/`. Cada institución tiene su enlace con `#`, por ejemplo `.../#maria-del-angel`.

### Qué cambia fuera de claude.ai
- **Funciona igual:** todos los módulos, personalización por institución, edición, Google Maps (botones y mapa incrustado), correo por Gmail y guardado en el navegador.
- **No funciona (necesita backend):** la sincronización en tiempo real entre usuarios y el asistente de IA con respuestas completas. En GitHub Pages cada navegador guarda sus propios datos y la IA responde en modo sin conexión.
- Para activarlas hay que conectar una base de datos real (por ejemplo Supabase) y un modelo de IA con una clave guardada en un servidor.

## Cómo armar la página
    python3 build.py
Une los archivos de `src/` en el orden del archivo `src/index.template.html` y genera `index.html` en la raíz. Si editas algo en `src/`, vuelve a ejecutar este comando antes de subir.

## Orden de carga (importante: cada archivo usa lo que definió el anterior)
### Estilos (`src/css`)
| Archivo | Contenido |
|---|---|
| 00-boot.css | Oculta la página hasta que el diseño de la institución está listo (evita destellos) |
| 01-base.css | Colores, tarjetas, tablas, menú, login 3D, temas por institución, barras de desplazamiento |
| 02-glassmorphism.css | Efecto de vidrio |
| 03-modulos-calendario.css | Calendario mensual, avisos, impresión a PDF |
| 04-controles.css | Casillas de verificación |
| 05-iconos-edicion.css | Íconos ✏️ ✖ 💾 y gráficos de reportes |
| 06-conexiones-reportes.css | Tarjeta de conexión de redes y barras de reportes |
| 07-matriculas.css | Centrado de metas de matrícula |
| 08-login-3d-estable.css | Correcciones del parpadeo del fondo 3D |

### Scripts (`src/js`)
| Archivo | Contenido |
|---|---|
| 00-boot-guard.js | Muestra la página si algo demora más de 4 s |
| 10-core-datos.js | Datos base, módulos, vistas principales, cuentas, autoguardado, instituciones |
| 11-logos.js | Logos de las instituciones (imágenes incrustadas, archivo pesado) |
| 12-core-logica.js | Temas por institución y base de datos por institución |
| 20-edicion-seguimiento-ia.js | Edición con lápiz, seguimiento de usuarios, asistente de IA, enlace por institución |
| 30-modulos-metricas-redes-reportes.js | Dashboard, plan, finanzas, CRM, biblioteca, redes, reportes |
| 31-embudo-email-reportes.js | Embudo, listas de docentes y alumnos, reportes por áreas |
| 40-sync-objetivos-docentes.js | Redes (imagen y copy), sugerencias, objetivos con sugerencias, docentes |
| 41-atl-google-maps.js | ATL con Google Maps |
| 42-sincronizacion-tiempo-real.js | Datos compartidos en tiempo real entre usuarios y cuentas compartidas |
| 43-logout-historial.js | Salida limpia y recarga al volver con la flecha del navegador |

## Aviso
Varios archivos redefinen funciones de los anteriores (por ejemplo `V.redes` se amplía en 20, 30, 31 y 40). Por eso **no se debe cambiar el orden**. Una fusión en una sola versión de cada módulo es un trabajo aparte que sí requiere pruebas.

## Documentación
`docs/registro-del-chat.md` resume la conversación de diseño y las decisiones del proyecto (hasta el 8 de noviembre de 2026).
