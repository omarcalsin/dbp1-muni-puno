// Lista de trámites (tramites.html).
// G-06 · Paso 4: las tarjetas se crean con createElement, se llenan con textContent y se agregan con append.
// G-07 · Paso 3: eventos input (buscar mientras se escribe), change (filtrar por área),
//                submit (botón Buscar) y click con delegación (ver u ocultar los requisitos).

const campo = document.querySelector("#q");
const selectorArea = document.querySelector("#area");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
let listaTramites = []; // se llena al iniciar
campo.value = parametro("q") || "";

// Crea la tarjeta <li> de un trámite.
function crearTarjeta(t) {
  const tarjeta = document.createElement("li");
  tarjeta.className = "tarjeta";
  const titulo = document.createElement("h2");
  const enlace = document.createElement("a");
  enlace.href = `detalle.html?id=${encodeURIComponent(t.id)}`;
  enlace.textContent = t.nombre;
  titulo.append(enlace);

  const datos = document.createElement("p");
  datos.className = "datos";
  datos.textContent = `Costo: ${soles(t.costo)} · Plazo: ${t.plazo} · ${t.area}`;
  tarjeta.append(titulo, datos);

  // Caso especial: se entrega en 1 día hábil → clase y texto (no solo color)
  if (Number.parseInt(t.plazo, 10) === 1) {
    tarjeta.classList.add("rapido");
    const etiqueta = document.createElement("p");
    etiqueta.className = "etiqueta";
    etiqueta.textContent = "Se entrega en 1 día hábil";
    tarjeta.append(etiqueta);
  }

  // Botón para ver los requisitos en la misma tarjeta (lo atiende el manejador de la lista)
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "boton secundario";
  boton.dataset.id = t.id;
  boton.setAttribute("aria-expanded", "false");
  boton.setAttribute("aria-controls", `req-${t.id}`);
  boton.textContent = "Ver requisitos";

  const requisitos = document.createElement("ol");
  requisitos.className = "requisitos";
  requisitos.id = `req-${t.id}`;
  requisitos.hidden = true;
  for (const requisito of t.requisitos) {
    const item = document.createElement("li");
    item.textContent = requisito;
    requisitos.append(item);
  }

  const ficha = document.createElement("a");
  ficha.href = enlace.href;
  ficha.textContent = "Ficha completa ›";

  tarjeta.append(boton, requisitos, ficha);
  return tarjeta;
}

// Muestra los trámites que coinciden con la palabra buscada y con el área elegida.
function mostrar() {
  const q = campo.value.trim().toLowerCase();
  const area = selectorArea.value;
  const encontrados = listaTramites.filter((t) =>
    t.nombre.toLowerCase().includes(q) && (area === "" || t.area === area));
  lista.replaceChildren(); // vacía la lista sin usar innerHTML
  for (const t of encontrados) {
    lista.append(crearTarjeta(t));
  }
  contador.textContent = `${encontrados.length} de ${listaTramites.length} trámites`;
  document.querySelector("#vacio").hidden = encontrados.length > 0;
}

// Llena el selector de áreas con las áreas que hay en los datos, sin repetir.
function llenarAreas() {
  const areas = [...new Set(listaTramites.map((t) => t.area))].sort();
  for (const area of areas) {
    const opcion = document.createElement("option");
    opcion.value = area;
    opcion.textContent = area;
    selectorArea.append(opcion);
  }
}

// Resumen con métodos de arreglos: cuántos se entregan en 1 día y el costo más bajo.
function mostrarResumen() {
  const rapidos = listaTramites.filter((t) => Number.parseInt(t.plazo, 10) === 1).length;
  const masBarato = listaTramites.reduce((min, t) => (t.costo < min ? t.costo : min), listaTramites[0].costo);
  document.querySelector("#resumen-tramites").textContent =
    `${rapidos} de ${listaTramites.length} trámites se entregan en 1 día hábil. El más económico cuesta ${soles(masBarato)}.`;
}

// input: filtra mientras se escribe
campo.addEventListener("input", mostrar);

// change: filtra al elegir un área
selectorArea.addEventListener("change", mostrar);

// submit: el botón Buscar no recarga la página
document.querySelector("#buscador").addEventListener("submit", (evento) => {
  evento.preventDefault();
  mostrar();
});

// click: un solo manejador en la lista atiende los botones de todas las tarjetas (delegación)
lista.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-id]");
  if (!boton) return;
  const requisitos = document.getElementById(boton.getAttribute("aria-controls"));
  const abrir = requisitos.hidden; // si estaba oculto, se abre
  requisitos.hidden = !abrir;
  boton.setAttribute("aria-expanded", String(abrir));
  boton.textContent = abrir ? "Ocultar requisitos" : "Ver requisitos";
});

function iniciar(datos) {
  listaTramites = datos;
  llenarAreas();
  mostrar();
  mostrarResumen();
}

iniciar(tramites());
