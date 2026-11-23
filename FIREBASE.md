# Conectar la plataforma a Firebase (una sola vez, ~5 minutos)

Con esto, todo lo que se haga en la plataforma (módulos, usuarios, permisos, instituciones, logos, mejoras y diseño) se ve igual en cualquier computadora y para todos los usuarios.

## 1. Crear el proyecto
1. Entra a https://console.firebase.google.com con tu cuenta de Google.
2. **Agregar proyecto** → ponle un nombre (por ejemplo `ndm-marketing`) → puedes desactivar Google Analytics → **Crear proyecto**.

## 2. Activar la base de datos
1. Menú izquierdo: **Compilación → Firestore Database → Crear base de datos**.
2. Ubicación: la más cercana (por ejemplo `southamerica-east1` o `us-central`).
3. Elige **modo de producción** → Crear.
4. Pestaña **Reglas**: borra todo, pega el contenido del archivo `firestore.rules` y pulsa **Publicar**.

## 3. Activar el acceso anónimo
1. **Compilación → Authentication → Comenzar**.
2. Pestaña **Método de acceso** → **Anónimo** → Habilitar → Guardar.
   (Los usuarios siguen entrando con su usuario y contraseña de la plataforma; esto solo permite que la página hable con la base de datos.)

## 4. Copiar la configuración
1. Ícono ⚙ junto a «Descripción general del proyecto» → **Configuración del proyecto**.
2. En **Tus apps**, pulsa el ícono **Web `</>`** → ponle un nombre → **Registrar app** (no hace falta Firebase Hosting).
3. Verás un bloque `const firebaseConfig = { apiKey: "...", ... }`.

## 5. Pegarla en GitHub
1. En tu repositorio abre `firebase-config.js` → lápiz ✏ (Edit).
2. Completa cada valor con los de tu `firebaseConfig` (entre comillas).
3. **Commit changes**. En 1–2 minutos GitHub Pages publica el cambio.

## 6. Comprobar
- Abre la plataforma: abajo a la derecha debe decir **☁ Sincronizado**.
- Entra como Admin en una computadora, crea un usuario o cambia algo; ábrela en otra computadora: el cambio aparece solo.
- Si dice **⚠ Sin permiso para guardar en la nube**: revisa los pasos 2.4 (reglas) y 3 (Anónimo).
- Si dice **⚠ Solo este equipo**: `firebase-config.js` está vacío o mal escrito.

## Primera conexión
La primera computadora que guarde un cambio sube sus datos a la nube; las demás los reciben. Conviene hacer la primera conexión desde la computadora que tenga los datos más completos.

## Opcional: Firebase Hosting en vez de GitHub Pages
Si tienes Node instalado: escribe tu Project ID en `.firebaserc`, luego `npm i -g firebase-tools`, `firebase login`, `firebase deploy`. Publica la página y las reglas de una vez.
