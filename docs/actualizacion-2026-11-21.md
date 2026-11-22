# Actualización del 21 de noviembre de 2026

Continuación de `registro-del-chat.md`. Cambios hechos sobre `index.html`:

1. **Panel Configuración** (solo en el inicio de sesión de New Digital Marketing.edu): Optimizar, Volver a la versión anterior, gestor de instituciones (agregar, quitar, renombrar, logo con lectura de colores) y Mejora. Versión visible abajo a la derecha (`v. 0.0.N`).
2. **Mejora** sin internet ni Claude: intérprete de instrucciones en español. Módulos (agregar apartado, tabla o enlace; renombrar; ocultar o mostrar; mover) y diseño (colores, fondo, letra, tamaño, bordes, sombras, densidad, modo oscuro, CSS propio). Los ajustes se guardan en `localStorage` (`ndm:sys`) y se reaplican al abrir.
3. **Salida de sesión** en todas las instituciones: pantalla con el color y el logo de la institución y luego el inicio de sesión.
4. **Colegio Demo** pasó a llamarse **Colegio Ndm.edu** (los datos guardados se migran solos).
5. **Esquina superior derecha** (autoguardado, usuario, institución) en blanco; "Salir" conserva el color de cada institución.
6. **Datos compartidos por institución:** todos los usuarios de una institución leen y escriben los mismos datos (clave `ndm:data:<institución>`).
7. **Fondo de los módulos:** se quitaron los círculos y puntos decorativos del menú y de la esquina inferior derecha.
8. **Usuarios y equipo independientes por institución:** cada institución tiene sus propias cuentas, permisos y equipo. `Admin` existe en todas con control total y es independiente en cada una (clave inicial `Admin`). El mismo usuario (nombre, cargo, usuario y contraseña) se puede crear en varias instituciones; son cuentas distintas. Dentro de una institución no se repite. `Prueba` es solo de Colegio Ndm.edu.

9. **Asistente de IA (funciona sin conexión):** ya no escribe en negrita con `**`. Responde sin internet y también **crea imágenes sin conexión**: afiches, posts cuadrados, historias y banners en SVG, con los colores y el nombre de la institución, descargables en PNG o SVG. Pídelas con «crea una imagen…» (temas: matrículas, puertas abiertas, aniversario, día de la madre, del padre y del maestro, vacaciones, reunión de padres, promociones, Navidad y talleres) o con tus propios textos entre comillas: título, subtítulo y botón. Con la IA conectada, el modelo puede crear diseños más libres. No genera fotos realistas.
10. **Asistente conversacional sin conexión:** además de marketing, conversa de todo un poco: saludos y despedidas según la hora, «¿cómo estás?», recuerda tu nombre («me llamo…»), dice la **fecha, el día y la hora** reales de tu equipo, cuenta cuántos días faltan para una fecha, hace cálculos (15 x 4, 25% de 800, raíz de 81), responde capitales y cultura general básica (incluye datos del Perú), explica términos de marketing (ROI, CTR, CPL, CAC, NPS, embudo, SEO, remarketing…), da consejos paso a paso (captar matrículas, redes, presupuesto, WhatsApp, eventos, fidelización), cuenta chistes, da frases motivadoras y redacta copys, mensajes de WhatsApp y correos. Sigue revisando tus datos (ROI, matrículas, alertas, cumpleaños, embudo) y creando imágenes. Sin conexión es un asistente por reglas: sobre temas que no conoce lo dice con honestidad en lugar de inventar, y no ve clima, noticias ni tipo de cambio. Con la IA conectada responde cualquier tema con el modelo.
11. **Actualización del 22 de noviembre de 2026**
   - **Configuración:** aviso de propiedad bajo el título (con ®) y lápiz ✏️ en cada institución para editar nombre y logo, con 💾 para guardar y ↩ para cancelar.
   - **Mejora más precisa:** respeta el texto exacto (reemplaza solo palabras completas y puede limitarse a un módulo), controla elementos concretos (títulos, botones, tarjetas, tablas, menú, panel…) con color de letra, fondo, borde, tamaño, negrita, cursiva, ancho, alto, espacios y opacidad, agrega imágenes, y también edita el panel de Configuración (agregar, renombrar, ocultar apartados).
   - **New Digital Marketing.edu** en el inicio de sesión: solo el «.edu» es el enlace para volver al inicio.
   - **Planificación estratégica › Ideas de mejora:** el sistema genera ideas con título y descripción según los datos de la institución, y también se pueden escribir; cada una con lápiz para editar.
   - **Planificador de redes › Feeds:** «Conectar con Facebook/Instagram/TikTok» abre una pestaña nueva; el feed se muestra dentro de un marco de celular con el módulo oficial de cada red. Facebook e Instagram piden permisos con el inicio de sesión de Meta (hace falta registrar una app de Meta y pegar su ID en la plataforma). TikTok no permite leer el feed por login desde una web: se muestra el perfil público del usuario.
   - **Biblioteca multimedia:** Google Drive se explora dentro de la plataforma (carpetas, miniaturas y archivos) tras conectar la cuenta de Google (hace falta un ID de cliente OAuth de Google), y una carpeta compartida se puede incrustar sin iniciar sesión. Google Fotos permite elegir fotos o álbumes y verlos aquí (Google ya no permite leer toda la biblioteca).
12. **Ajustes del 22 de noviembre (segunda parte):** las Ideas de mejora ahora incluyen ideas institucionales (control de evaluación de aula, reubicar el próximo evento en un lugar más amplio, más gigantografías para cubrir zonas poco atractivas, marco de globos para el Open Day, señalización, seguridad, escuela de padres, etc.) además de las basadas en los datos, y cada vez que se pulsa «Generar» se agregan nuevas. «NPS de las familias» pasó a llamarse «Recomendación de las familias (−100 a 100)». El fondo de los módulos es de color sólido y las tarjetas y el menú son opacos (sin transparencia ni desenfoque).

## Pendientes
- Pantalla para cambiar contraseñas.
- Pedir clave de Admin para abrir el panel Configuración (hoy es visible para cualquiera en ese inicio de sesión).
- Sincronización entre equipos y IA completa fuera de claude.ai (requiere backend).


## Orden y optimización (22/11/2026)
- Código separado en `src/` (CSS y JS por secciones numeradas) con `build.py` que arma el `index.html` único.
- Los 8 bloques de estilos sueltos del final de la página se unificaron en uno solo en el encabezado (mismo orden, misma cascada).
- Logos de las 3 instituciones convertidos de PNG a WebP sin pérdida (−79 KB; diferencia visual máxima 1/255).
- Eliminado un temporizador que nunca se ejecutaba (`if(0&&…)`).
- Verificado: 20 módulos × 7 instituciones con el mismo contenido que antes, pruebas anteriores sin errores y capturas visuales equivalentes.
