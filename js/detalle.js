// Ficha de un trámite (detalle.html?id=...). Todo se muestra con textContent.
// G-07 · Paso 4: lee los datos desde data/tramites.json mediante cargarTramites().

function crear(etiqueta, texto, clase) {
  const el = document.createElement(etiqueta);
  if (texto !== undefined) el.textContent = texto;
  if (clase) el.className = clase;
  return el;
}

function crearBoton(texto, destino, clase) {
  const enlace = crear("a", texto, clase);
  enlace.href = destino;
  return enlace;
}

function casilla(nombre, valor) {
  const div = crear("div", nombre);
  div.append(crear("strong", valor));
  return div;
}

// G-06 · Paso 2: el resultado de fechaDeEntrega() se muestra en la página con textContent
function crearAvisoEntrega(tramite) {
  const entrega = crear("p", undefined, "entrega");
  entrega.id = "entrega";
  try {
    const dias = Number.parseInt(tramite.plazo, 10);
    const fechaLista = fechaDeEntrega(new Date(), dias);
    entrega.textContent = `Si lo presenta hoy, estaría listo aprox. el ${formatoFecha(fechaLista)} (sin contar feriados).`;
  } catch (e) {
    entrega.textContent = `No se pudo calcular la fecha de entrega: ${e.message}.`;
  }
  return entrega;
}

function mostrarFicha(tramite, ficha) {
  const resumen = crear("div", undefined, "resumen");
  resumen.append(casilla("Costo", soles(tramite.costo)), casilla("Plazo", tramite.plazo), casilla("Dónde", "Mesa de partes"));

  const requisitos = crear("ol", undefined, "requisitos");
  for (const requisito of tramite.requisitos) {
    requisitos.append(crear("li", requisito));
  }

  const acciones = crear("div", undefined, "acciones");
  acciones.append(
    crearBoton("Ya lo presenté: ver estado", "expediente.html", "boton"),
    crearBoton("‹ Volver a trámites", "tramites.html", "boton secundario")
  );

  ficha.replaceChildren(crear("h1", tramite.nombre), crear("p", tramite.area), resumen,
    crearAvisoEntrega(tramite), crear("h2", "Requisitos"), requisitos, acciones);
}

function mostrarNoEncontrado(ficha) {
  const aviso = crear("div", undefined, "mensaje error");
  aviso.setAttribute("role", "alert");
  mostrarMensaje(aviso, "⚠ Trámite no encontrado", "Revise el enlace o busque el trámite en la lista.");
  ficha.replaceChildren(crear("h1", "Trámite no encontrado"), aviso,
    crearBoton("‹ Volver a trámites", "tramites.html", "boton secundario"));
}

const ficha = document.getElementById("ficha");
cargarTramites()
  .then((lista) => {
    const tramite = lista.find((x) => x.id === parametro("id"));
    if (tramite) {
      document.getElementById("miga").textContent = tramite.nombre;
      document.title = `${tramite.nombre} · Municipalidad Provincial de Puno`;
      mostrarFicha(tramite, ficha);
    } else {
      document.getElementById("miga").textContent = "Trámite no encontrado";
      document.title = "Trámite no encontrado · Municipalidad Provincial de Puno";
      mostrarNoEncontrado(ficha);
    }
  })
  .catch(() => {
    document.getElementById("miga").textContent = "Error de carga";
    const aviso = crear("div", undefined, "mensaje error");
    aviso.setAttribute("role", "alert");
    mostrarMensaje(aviso, "⚠ No se pudo cargar el trámite",
      "Abra el proyecto desde un servidor local (http://) e intente de nuevo.");
    ficha.replaceChildren(crear("h1", "No se pudo cargar el trámite"), aviso,
      crearBoton("‹ Volver a trámites", "tramites.html", "boton secundario"));
  });
