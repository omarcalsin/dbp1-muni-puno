# Plataforma web de la Municipalidad Provincial de Puno

Proyecto del curso Desarrollo Basado en Plataformas I (SIS302), UNA-Puno, 2026-II.
Prototipo con datos de prueba ficticios (el portal real de referencia es `portal.munipuno.gob.pe`).

**Ver en línea (GitHub Pages):** https://omarcalsin.github.io/dbp1-muni-puno/ (publicado desde la rama `main`).

## Integrantes
- Calsin Calsin Omar · usuario de GitHub: `omarcalsin`

## Herramientas, fuentes y declaración de IA
- **Entorno:** Visual Studio Code, Git y GitHub.
- **Pruebas y validación:** Firefox (motor Gecko), Brave (motor Chromium), servicio de validación del W3C (HTML y CSS) y script revisor en Python del texto de estudio (semana 8).
- **Datos e imágenes:** costos, plazos y expedientes ficticios de prueba; textos de referencia tomados del portal público `portal.munipuno.gob.pe`. No se usaron plantillas externas ni bibliotecas de terceros en la Unidad I.
- **Herramientas de IA usadas:** Claude y Gemini en Antigravity / Claude Code (apoyo en la estructura del repositorio y el formulario en la G-05, los scripts y la revisión de código en la G-06, y la carga del JSON y pruebas de integración en las G-07 y G-08). Codex apoyó la revisión de las plantillas G-07/G-08, la preparación de la exposición y las pruebas del catálogo, la consulta y la edición de trámites.

## Estructura del repositorio
- `index.html`, `tramites.html`, `detalle.html`, `expediente.html`, `login.html`, `admin.html` y `ejercicios.html` (G-06)
- `css/estilos.css` (estilos generales y transiciones) y `css/maqueta.css` (rejilla con `grid-template-areas` y `repeat(auto-fill, minmax(...))` de `tramites.html`)
- `data/tramites.json` (catálogo de 6 trámites municipales en formato JSON)
- `js/` scripts separados por vista (`datos.js`, `inicio.js`, `tramites.js`, `plazo.js`, `detalle.js`, `expediente.js`, `login.js`, `admin.js`, `ejercicios-consola.js`)
- `img/` carpeta de recursos gráficos

## Prácticas de la Unidad I (EVI2-U1 y EVI3-U1)
| Semana | Práctica | Archivos principales |
|---|---|---|
| 5 (G-05) | Entorno de desarrollo y formulario accesible (HU-03) | `expediente.html`, `js/expediente.js` (prueba con `0001` o `0002`) |
| 6 (G-06) | Programación con JavaScript y el DOM | `ejercicios.html`, `js/ejercicios-consola.js`, `js/plazo.js`, `js/detalle.js`, `js/inicio.js`, `js/tramites.js` |
| 7 (G-07) | Interfaz interactiva: Grid, Flexbox, transiciones, eventos y JSON | `tramites.html`, `css/maqueta.css`, `css/estilos.css`, `js/tramites.js`, `data/tramites.json` |
| 8 (G-08) | Integración del proyecto web de la Unidad I (HU-01, HU-02, HU-03 y HU-05) | Todo el sitio validado sin errores en el W3C (HTML y CSS) |

### Revisión del código (G-06, pasos 5 y 6)
No hubo otro equipo disponible: la revisión con la lista P-04 se hizo con IA y está declarada en la Plantilla B. Correcciones aplicadas:
1. `js/expediente.js`: mensajes con `textContent` en vez de `innerHTML` (evita XSS por `?n=`).
2. `admin.html`: opciones y mensajes con `createElement` y `textContent`.
3. `js/detalle.js`: aviso de «Trámite no encontrado» y nombres descriptivos.
