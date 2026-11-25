// Edición de trámites por el administrador (admin.html, HU-05).

if (!sesionIniciada()) location.replace("login.html");

const selector = document.getElementById("tramite");
const campoCosto = document.getElementById("costo");
const campoPlazo = document.getElementById("plazo");
const errCosto = document.getElementById("err-costo");
const errPlazo = document.getElementById("err-plazo");
const ok = document.getElementById("ok");
const error = document.getElementById("error");
let catalogoAdmin = [];

function cargarSeleccionado() {
  const tramite = catalogoAdmin.find((x) => x.id === selector.value);
  if (!tramite) return;
  campoCosto.value = Number(tramite.costo).toFixed(2);
  campoPlazo.value = tramite.plazo;
  document.getElementById("ver").href = "detalle.html?id=" + encodeURIComponent(tramite.id);
}

cargarTramites()
  .then((lista) => {
    catalogoAdmin = lista;
    for (const tramite of catalogoAdmin) {
      const opcion = document.createElement("option");
      opcion.value = tramite.id;
      opcion.textContent = tramite.nombre;
      selector.append(opcion);
    }
    cargarSeleccionado();
  })
  .catch(() => {
    mostrarMensaje(error, "⚠ No se pudo cargar el catálogo",
      "Abra el proyecto desde un servidor local (http://) e intente de nuevo.");
    error.hidden = false;
  });

selector.addEventListener("change", cargarSeleccionado);

document.getElementById("form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  ok.hidden = true;
  error.hidden = true;

  const valor = Number(campoCosto.value.trim().replace(",", "."));
  const costoValido = campoCosto.value.trim() !== "" && !Number.isNaN(valor) && valor >= 0;
  errCosto.textContent = costoValido ? "" : "⚠ Escriba un número mayor o igual a 0, por ejemplo 120.50.";
  errCosto.hidden = costoValido;
  campoCosto.setAttribute("aria-invalid", costoValido ? "false" : "true");

  const plazoValido = campoPlazo.value.trim() !== "";
  errPlazo.textContent = plazoValido ? "" : "⚠ Escriba el plazo del trámite, por ejemplo 15 días hábiles.";
  errPlazo.hidden = plazoValido;
  campoPlazo.setAttribute("aria-invalid", plazoValido ? "false" : "true");

  if (!costoValido || !plazoValido) return;

  guardarCambio(selector.value, { costo: valor, plazo: campoPlazo.value.trim() });
  const actual = catalogoAdmin.find((x) => x.id === selector.value);
  if (actual) {
    actual.costo = valor;
    actual.plazo = campoPlazo.value.trim();
  }
  mostrarMensaje(ok, "✔ Cambios guardados", `El ciudadano ya ve el nuevo costo: ${soles(valor)}.`);
  ok.hidden = false;
});

document.getElementById("salir").addEventListener("click", (ev) => {
  ev.preventDefault();
  try { sessionStorage.removeItem("sesion"); } catch (e) {}
  location.href = "index.html";
});
