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
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
if (!window.NDM_FIREBASE.apiKey || !window.NDM_FIREBASE.projectId) window.NDM_FIREBASE = null;
