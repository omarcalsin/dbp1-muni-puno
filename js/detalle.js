// Ficha de un trámite (detalle.html?id=...). Todo se muestra con textContent.
const t = tramites().find((x) => x.id === parametro("id")) || tramites()[0];
document.getElementById("miga").textContent = t.nombre;
document.title = `${t.nombre} · Municipalidad Provincial de Puno`;

// Crea un elemento con su texto (atajo para no repetir tres líneas).
function crear(etiqueta, texto, clase) {
  const el = document.createElement(etiqueta);
  if (texto !== undefined) el.textContent = texto;
  if (clase) el.className = clase;
  return el;
}

// Una casilla del resumen: «Costo / S/ 120.50»
function casilla(nombre, valor) {
  const div = crear("div", nombre);
  div.append(crear("strong", valor));
  return div;
}

const ficha = document.getElementById("ficha");
const resumen = crear("div", undefined, "resumen");
resumen.append(casilla("Costo", soles(t.costo)), casilla("Plazo", t.plazo), casilla("Dónde", "Mesa de partes"));

// G-06 · Paso 2: el resultado de la función se muestra en la página con textContent
const entrega = crear("p", undefined, "entrega");
entrega.id = "entrega";
try {
  const hoy = new Date();
  const dias = Number.parseInt(t.plazo, 10); // "15 días hábiles" → 15
  const fechaLista = fechaDeEntrega(hoy, dias);
  entrega.textContent = `Si lo presenta hoy, estaría listo aprox. el ${formatoFecha(fechaLista)} (sin contar feriados).`;
} catch (e) {
  entrega.textContent = `No se pudo calcular la fecha de entrega: ${e.message}.`;
}

const requisitos = crear("ol", undefined, "requisitos");
for (const r of t.requisitos) {
  requisitos.append(crear("li", r));
}

const acciones = crear("div", undefined, "acciones");
const verEstado = crear("a", "Ya lo presenté: ver estado", "boton");
verEstado.href = "expediente.html";
const volver = crear("a", "‹ Volver a trámites", "boton secundario");
volver.href = "tramites.html";
acciones.append(verEstado, volver);

ficha.append(crear("h1", t.nombre), crear("p", t.area), resumen, entrega, crear("h2", "Requisitos"), requisitos, acciones);
