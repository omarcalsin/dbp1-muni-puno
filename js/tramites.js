// G-06 · Paso 4 · Lista de trámites generada a partir de un arreglo de objetos (TRAMITES, en datos.js).
// Cada tarjeta se crea con createElement, se llena con textContent y se agrega con append.

const campo = document.querySelector("#q");
const lista = document.querySelector("#lista");
campo.value = parametro("q") || "";

// Crea la tarjeta <li> de un trámite.
function crearTarjeta(t) {
  const tarjeta = document.createElement("li");
  const titulo = document.createElement("h2");
  const enlace = document.createElement("a");
  enlace.href = `detalle.html?id=${encodeURIComponent(t.id)}`;
  enlace.textContent = t.nombre;
  titulo.append(enlace);

  const datos = document.createElement("p");
  datos.className = "datos";
  datos.textContent = `Costo: ${soles(t.costo)} · Plazo: ${t.plazo} · ${t.area}`;

  const ver = document.createElement("a");
  ver.href = enlace.href;
  ver.textContent = "Ver requisitos ›";

  tarjeta.append(titulo, datos);
  // Caso especial: se entrega en 1 día hábil → clase y texto (no solo color)
  if (Number.parseInt(t.plazo, 10) === 1) {
    tarjeta.classList.add("rapido");
    const etiqueta = document.createElement("p");
    etiqueta.className = "etiqueta";
    etiqueta.textContent = "Se entrega en 1 día hábil";
    tarjeta.append(etiqueta);
  }
  tarjeta.append(ver);
  return tarjeta;
}

// Muestra los trámites que coinciden con la búsqueda.
function mostrar() {
  const q = campo.value.trim().toLowerCase();
  const encontrados = tramites().filter((t) => t.nombre.toLowerCase().includes(q));
  lista.replaceChildren(); // vacía la lista sin usar innerHTML
  for (const t of encontrados) {
    lista.append(crearTarjeta(t));
  }
  document.querySelector("#contador").textContent = q
    ? `${encontrados.length} trámite(s) con «${campo.value.trim()}»`
    : `${encontrados.length} trámites`;
  document.querySelector("#vacio").hidden = encontrados.length > 0;
}

// Resumen con métodos de arreglos: cuántos se entregan en 1 día y el costo más bajo.
function mostrarResumen() {
  const todos = tramites();
  const rapidos = todos.filter((t) => Number.parseInt(t.plazo, 10) === 1).length;
  const masBarato = todos.reduce((min, t) => (t.costo < min ? t.costo : min), todos[0].costo);
  document.querySelector("#resumen-tramites").textContent =
    `${rapidos} de ${todos.length} trámites se entregan en 1 día hábil. El más económico cuesta ${soles(masBarato)}.`;
}

document.querySelector("#buscador").addEventListener("submit", (ev) => {
  ev.preventDefault();
  mostrar();
});
campo.addEventListener("input", mostrar);
mostrar();
mostrarResumen();
