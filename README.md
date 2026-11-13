# Plataforma web de la Municipalidad Provincial de Puno

Proyecto del curso Desarrollo Basado en Plataformas I, UNA-Puno, 2026-II.
Prototipo con datos de prueba ficticios.

## Integrantes
- Calsin Calsin Omar · usuario de GitHub: omarcalsin

## Herramientas
- Visual Studio Code, Git y GitHub
- Firefox y Brave (pruebas), validador del W3C
- Herramientas de IA usadas: Claude Code (ayuda con la estructura del repositorio y el formulario en la G-05, y con los scripts de la G-06). Todo el código se revisó y se probó en el navegador.

## Estructura
- `index.html`, `tramites.html`, `detalle.html`, `expediente.html`, `login.html`, `admin.html`, `ejercicios.html` (G-06)
- `css/` estilos · `js/` scripts y datos de prueba · `img/` imágenes

## Formulario principal
`expediente.html`: consulta del estado de un expediente (HU-03). Prueba con el expediente 0001 o 0002.

## Scripts de la G-06 (JavaScript y el DOM)
| Paso | Archivo | Qué hace |
|---|---|---|
| 1 | `js/ejercicios-consola.js` (se abre con `ejercicios.html`) | Los cuatro ejercicios de la consola |
| 2 | `js/plazo.js` y `js/detalle.js` | `fechaDeEntrega()` calcula cuándo estaría listo un trámite (solo días hábiles) y se muestra en `detalle.html` con `textContent` |
| 3 | `js/inicio.js` | En `index.html` cambia el texto, el atributo `datetime` y la clase `abierto`/`cerrado` del horario de atención |
| 4 | `js/tramites.js` | La lista de `tramites.html` se genera con `createElement` a partir del arreglo `TRAMITES` (`js/datos.js`), con resumen hecho con `filter` y `reduce` |

### Revisión del código (G-06, pasos 5 y 6)
No hubo un equipo revisor disponible: la revisión con la lista P-04 se hizo con Claude Code y está declarada así en la Plantilla B. Correcciones aplicadas:
1. `js/expediente.js`: mensajes con `textContent` en vez de `innerHTML` (el número de `?n=` permitía XSS).
2. `admin.html`: opciones y mensajes con `createElement` y `textContent`.
3. `js/detalle.js`: aviso de «Trámite no encontrado» y nombres descriptivos.
