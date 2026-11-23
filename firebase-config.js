/* =====================================================================
   CONEXIÓN CON FIREBASE — sincroniza todo entre computadoras y usuarios
   ---------------------------------------------------------------------
   1. Crea tu proyecto en https://console.firebase.google.com (ver FIREBASE.md).
   2. Copia aquí los valores de "firebaseConfig" de tu app web.
   3. Guarda este archivo en GitHub (lápiz ✏ → Commit changes).
   Mientras apiKey esté vacío, la plataforma funciona solo en cada navegador.
   Estos valores NO son secretos: Firebase los diseña para ir en la página.
   La seguridad la dan las reglas de firestore.rules.
   ===================================================================== */
window.NDM_FIREBASE = {
  apiKey: "",   /* <-- PEGA AQUÍ la apiKey (Firebase → ⚙ Configuración del proyecto → Tus apps → Configuración del SDK) */
  authDomain: "ndm-marketing-edu.firebaseapp.com",
  projectId: "ndm-marketing-edu",
  storageBucket: "ndm-marketing-edu.firebasestorage.app",
  messagingSenderId: "611929648586",
  appId: "1:611929648586:web:c2de026bb83f770748b333"
};
if (!window.NDM_FIREBASE.apiKey || !window.NDM_FIREBASE.projectId) window.NDM_FIREBASE = null;
