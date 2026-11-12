# New Digital Marketing.edu: registro del chat

Resumen ordenado de la conversación (no es una transcripción palabra por palabra). Fecha de cierre del registro: 8 de noviembre de 2026.

**Plataforma publicada:** https://claude.ai/artifact/YX5jUFzAcbKYJdyVxVuQF3
**Archivo de la plataforma:** `new-digital-marketing-edu.html`

---

## 1. Objetivo del proyecto

Crear una plataforma web de marketing automatizado, exclusiva para instituciones educativas, llamada **New Digital Marketing.edu**. El personal de marketing de cada institución entra con usuario y contraseña y gestiona captación de alumnos, contenido, campañas y fidelización en un solo lugar. La empresa ya cuenta con RUC.

---

## 2. Cómo evolucionó la conversación

### 2.1 Planteamiento inicial
- Se definieron los 5 bloques de un sistema de marketing y ventas: captación de leads, CRM central, automatización de contenido, secuencias de ventas y medición.
- Se decidió que fuera una **página web (aplicación web)** y no un programa de escritorio.
- Se repasaron los **pilares del marketing**: las 4P (producto, precio, plaza, promoción) y los pilares digitales (cliente ideal, marca, contenido, embudo, datos, automatización, fidelización).
- Se explicó cómo tener una web funcionando **sin presupuesto**: hosting gratuito (Netlify, Vercel, Cloudflare Pages o GitHub Pages), base de datos gratuita (Supabase o Firebase), automatizaciones (n8n o Make), correo (Brevo o MailerLite) y medición (Google Analytics).

### 2.2 Definición de la plataforma
- Primera estructura de 12 módulos (acceso con roles, dashboard, CRM, embudo, segmentación, contenido, calendario, email, WhatsApp, campañas, analítica y configuración).
- Se **eliminó la conexión con Canva** y se pidió un **planificador de contenido tipo Metricool** para Facebook, Instagram y TikTok.
- Se detectaron módulos repetidos y se consolidó de 11 a 8 módulos.
- Se definió dónde ver **matriculados y nuevos matriculados** (dashboard, CRM y analítica) y dónde ver el **ROI** (analítica, dashboard y campañas).
- Decisión sobre el ROI: la fórmula es (ingresos − inversión) ÷ inversión × 100. Se asumió que el ingreso por alumno incluye matrícula más pensiones proyectadas; esto se puede cambiar a "solo matrícula".

### 2.3 Identidad de marca
- Primer logo: texto "New Digital Marketing.edu" en rojo sobre fondo de papel.
- Logo final: símbolo de **4 triángulos rojos que apuntan hacia abajo** (dos arriba y dos abajo, desplazados media posición) junto al texto. Rojo tomado del logo: `#FC3030`.
- El fondo de la plataforma es blanco. El menú lateral tiene fondo de papel arrugado.

### 2.4 Construcción del prototipo
Se construyó la web como un único archivo HTML y se fue ajustando según tus indicaciones:
- Fondo blanco, rojo del logo y elementos gráficos decorativos.
- Pantalla de ingreso con escena en 3D (logo con volumen, cubos, esferas, anillos y piso en perspectiva).
- Línea divisoria roja, gruesa y redondeada entre el logo y los apartados del menú.
- Se corrigió un error en el que las listas de tareas pendientes, sugerencias, automatizaciones, promociones y usuarios se movían por un conflicto de nombres de clase.
- **WhatsApp y fidelización:** automatizaciones y sección "Contacto y estado de ánimo" con emojis (😄 🙂 😐 🙁 😠) y alerta cuando una familia está poco a gusto. Solo muestra WhatsApp, sin correos.
- **Email marketing:** tabla de familias contactadas por correo (sin WhatsApp) y tabla de **cumpleaños** de docentes y de integrantes de familias matriculadas.
- **Planificador de redes:** pestañas de Calendario y de Feeds. En Feeds se pegan los links de Facebook, Instagram y TikTok institucionales y se arma una vista previa de cada perfil.
- **CRM, embudo y matrículas:** el primer apartado es la Lista de familias, luego Embudo, Matrículas y Cliente ideal. Se agregaron correo, WhatsApp y **Distrito / Urbanización** (entre Grado y Origen) y la **carga de familias desde Excel o CSV**.
- **Base de cálculo del ROI:** se movió de Configuración a **Campañas y promociones**.
- Menú ampliado con **Plan anual de marketing** (segundo apartado), **Actividades institucionales** (después de Analítica y reportes) y **ATL** (último).

### 2.5 Módulos finales del menú
1. Dashboard
2. Plan anual de marketing
3. CRM, embudo y matrículas
4. Planificador de redes
5. Email marketing
6. WhatsApp y fidelización
7. Campañas y promociones
8. Analítica y reportes
9. Actividades institucionales
10. Configuración y usuarios
11. ATL

**Notas por módulo**
- **Plan anual:** 12 meses con enfoque, acciones y presupuesto, e inversión anual total.
- **Actividades institucionales:** calendario del año con qué se realizará, implementos y cómo se documenta (📷 fotos, 🎥 video, 🔴 live).
- **ATL:** mapa esquemático de Lima donde se colocan puntos de gigantografías por institución. No es un mapa real con calles.

### 2.6 Instituciones y personalización
En el inicio de sesión se quitó el rol y se agregó el selector **"Institución educativa"**. Al elegir una institución, el login y el panel se personalizan y el selector desaparece. En ese caso aparece abajo a la derecha el texto **New Digital Marketing.edu** para volver al inicio.

| Institución | Personalización |
|---|---|
| Colegio Demo | Rojo de New Digital Marketing.edu; conserva el selector |
| NDM Institute | Fondo negro y logo enviado; menú negro; acentos en blanco y negro; términos **alumnos** y **cursos** |
| Universidad César Vallejo | Color provisional (ámbar) y nombre como logo, a la espera del logo |
| Colegio María del Ángel | Fondo verde y logo enviado; menú verde |
| Católica School | Fondo claro con tintes del logo, logo enviado y acento azul |
| Colegio La Unión | Color provisional, a la espera del logo |
| Colegio Virgen del Carmen | Color provisional, a la espera del logo |

**Base de datos por institución:** cada una tiene su propia información (familias o alumnos, campañas, publicaciones, cumpleaños, actividades, metas, perfiles de cliente ideal, usuarios y valores de matrícula y pensión). NDM Institute tiene 3 alumnos de ejemplo. En el ATL, cada institución ve solo sus gigantografías.

### 2.7 Barras de desplazamiento
Se pidió que **todas las barras, horizontales y verticales, y de todas las instituciones**, sigan el formato de la web de María del Ángel:
- Ancho de 15 px.
- Fondo (pista) blanco: `#fcfcfc`.
- Control que se arrastra en gris `#8b8b8b`, con extremos redondeados y un margen de 3 px.
- Flechas triangulares pequeñas en el mismo gris.

El problema de que no se aplicaba venía de reglas de barras antiguas y de un script que inyectaba estilos oscuros y de color del tema. Se eliminaron y quedó una sola definición, comprobada en un navegador real con las barras horizontal y vertical, en el demo, NDM Institute, María del Ángel y Católica School. En Firefox no se pueden dibujar las flechas.

---

## 3. Qué es real y qué es de ejemplo

**Es de ejemplo en este prototipo:**
- Inicio de sesión: acepta cualquier usuario y contraseña.
- Datos de familias, alumnos, campañas, métricas y cumpleaños.
- Feeds de redes: vista simulada a partir del link.
- Mapa de ATL: dibujo referencial.
- Los datos viven solo en la sesión del navegador (no se guardan).

**Funciona de verdad en el prototipo:**
- Navegación entre módulos y personalización por institución.
- Avanzar familias en el embudo, agregar familias, campañas, publicaciones, actividades y puntos de ATL.
- Cálculo de ROI a partir de los valores de matrícula y pensión.
- Lectura de archivos Excel o CSV para cargar familias.

---

## 4. Pendientes y siguientes pasos

1. Enviar los logos de **Universidad César Vallejo**, **Colegio La Unión** y **Colegio Virgen del Carmen**.
2. Decidir si Universidad César Vallejo usará alumnos, carreras y ciclos en lugar de familias y grados.
3. Pasar a **usuarios reales** con una base de datos por institución (por ejemplo Supabase).
4. Conectar la **publicación real en redes** (APIs de Meta y TikTok, con aprobación previa; TikTok suele demorar más).
5. Conectar **correo** (Brevo o MailerLite) y **WhatsApp Business API**.
6. Reemplazar el mapa de ATL por uno real (Google Maps u OpenStreetMap).
7. Cumplir con la **ley de protección de datos personales de Perú**, porque se manejan datos de menores.
8. Definir el modelo de negocio (suscripción por institución, por usuarios o por módulos).
9. Confirmar si el ROI considera solo matrícula o también pensiones proyectadas (hoy se asume matrícula más pensiones, configurable).
