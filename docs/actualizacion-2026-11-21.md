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

## Pendientes
- Pantalla para cambiar contraseñas.
- Pedir clave de Admin para abrir el panel Configuración (hoy es visible para cualquiera en ese inicio de sesión).
- Sincronización entre equipos y IA completa fuera de claude.ai (requiere backend).
