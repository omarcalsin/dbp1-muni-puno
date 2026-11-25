// Datos de prueba ficticios y utilidades compartidas.
// G-07 · Paso 4: el catálogo de trámites se trasladó a data/tramites.json y se carga con fetch.

const EXPEDIENTES = {
  "0001": { estado: "En revisión", tramite: "Licencia de funcionamiento", ingreso: "10/09/2026", area: "Subgerencia de Licencias" },
  "0002": { estado: "Listo para recoger", tramite: "Copia certificada de partida de nacimiento", ingreso: "11/09/2026", area: "Registro Civil" }
};

// Lo que guarda el administrador se aplica encima de los datos del JSON (solo en esta pestaña).
function leerCambios() {
  try { return JSON.parse(sessionStorage.getItem("cambios") || "{}"); } catch (e) { return {}; }
}

function guardarCambio(id, datos) {
  try {
    const c = leerCambios();
    c[id] = datos;
    sessionStorage.setItem("cambios", JSON.stringify(c));
    return true;
  } catch (e) {
    return false;
  }
}

function aplicarCambios(lista) {
  const c = leerCambios();
  return lista.map((t) => Object.assign({}, t, c[t.id] || {}));
}

// Obtiene data/tramites.json con fetch y aplica los cambios de la sesión.
function cargarTramites() {
  return fetch("data/tramites.json")
    .then((respuesta) => {
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      return respuesta.json();
    })
    .then((datos) => aplicarCambios(datos));
}

function soles(n) { return "S/ " + Number(n).toFixed(2); }
function parametro(nombre) { return new URLSearchParams(location.search).get(nombre); }
function sesionIniciada() { try { return sessionStorage.getItem("sesion") === "admin"; } catch (e) { return false; } }

// Escribe un mensaje «título + texto» en una caja, con textContent (sin innerHTML).
function mostrarMensaje(caja, titulo, texto) {
  const fuerte = document.createElement("strong");
  fuerte.textContent = titulo;
  caja.replaceChildren(fuerte, texto);
}
