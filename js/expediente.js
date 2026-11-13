const form = document.getElementById("form");
const resumen = document.getElementById("resumen");
const ok = document.getElementById("ok");
const error = document.getElementById("error");

const mensajes = {
  numero: {
    valueMissing: "Escriba el número de su expediente.",
    patternMismatch: "El número de expediente tiene 4 dígitos, por ejemplo 0001.",
    tooShort: "El número de expediente tiene 4 dígitos, por ejemplo 0001."
  },
  dni: {
    valueMissing: "Escriba el DNI del solicitante.",
    patternMismatch: "El DNI tiene 8 dígitos, sin espacios ni letras.",
    tooShort: "El DNI tiene 8 dígitos, sin espacios ni letras."
  },
  fecha: {
    rangeUnderflow: "La fecha debe ser de 2026, desde el 01/01/2026.",
    rangeOverflow: "La fecha debe ser de 2026, hasta el 31/12/2026.",
    badInput: "Escriba la fecha completa, por ejemplo 10/09/2026."
  },
  correo: {
    typeMismatch: "Escriba un correo válido, por ejemplo nombre@correo.com."
  },
  celular: {
    patternMismatch: "El celular tiene 9 dígitos y empieza con 9, por ejemplo 951234567."
  }
};

function mensajeDe(campo) {
  const tipos = mensajes[campo.id] || {};
  for (const tipo in tipos) {
    if (campo.validity[tipo]) return tipos[tipo];
  }
  return campo.validationMessage;
}

function mostrarError(campo, texto) {
  const p = document.getElementById("err-" + campo.id);
  p.textContent = "⚠ " + texto;
  p.hidden = false;
  campo.setAttribute("aria-invalid", "true");
}

function limpiarError(campo) {
  const p = document.getElementById("err-" + campo.id);
  p.textContent = "";
  p.hidden = true;
  campo.removeAttribute("aria-invalid");
}

function validarCampo(campo) {
  if (campo.validity.valid) {
    limpiarError(campo);
    return true;
  }
  mostrarError(campo, mensajeDe(campo));
  return false;
}

function consultar(n) {
  ok.hidden = true;
  error.hidden = true;
  const e = EXPEDIENTES[n];
  if (!e) {
    mostrarMensaje(error, "✖ Expediente no encontrado", `No existe el expediente ${n}. Revise el número en su cargo de recepción.`);
    error.hidden = false;
    return;
  }
  mostrarMensaje(ok, `✔ Expediente ${n}: ${e.estado}`, `${e.tramite} · Ingresó el ${e.ingreso} · ${e.area}`);
  ok.hidden = false;
}

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  ok.hidden = true;
  error.hidden = true;
  const invalidos = [];
  for (const campo of form.elements) {
    if (campo.tagName === "INPUT" && !validarCampo(campo)) invalidos.push(campo);
  }
  if (invalidos.length > 0) {
    const titulo = document.createElement("strong");
    titulo.textContent = `⚠ Revise ${invalidos.length} ${invalidos.length === 1 ? "campo" : "campos"}`;
    const lista = document.createElement("ul");
    for (const campo of invalidos) {
      const enlace = document.createElement("a");
      enlace.href = "#" + campo.id;
      enlace.textContent = mensajeDe(campo);
      const item = document.createElement("li");
      item.append(enlace);
      lista.append(item);
    }
    resumen.replaceChildren(titulo, lista);
    resumen.hidden = false;
    resumen.focus();
    return;
  }
  resumen.hidden = true;
  consultar(document.getElementById("numero").value.trim());
});

form.addEventListener("input", function (ev) {
  const campo = ev.target;
  if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
});

form.addEventListener("focusout", function (ev) {
  const campo = ev.target;
  if (campo.tagName === "INPUT" && campo.value !== "") validarCampo(campo);
});

if (parametro("n")) {
  document.getElementById("numero").value = parametro("n");
  consultar(parametro("n"));
}
