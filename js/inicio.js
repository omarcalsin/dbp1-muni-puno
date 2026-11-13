// G-06 · Paso 3 · Seleccionar elementos del DOM y cambiar su contenido, un atributo y una clase.
// Página: index.html, tarjeta «Atención presencial».

// Devuelve true si la fecha cae en el horario de atención (lunes a viernes, de 8:00 a 16:00 h).
function estaAbierto(fecha) {
  const dia = fecha.getDay(); // 0 = domingo, 6 = sábado
  const hora = fecha.getHours();
  return dia >= 1 && dia <= 5 && hora >= 8 && hora < 16;
}

const ahora = new Date();
const estado = document.querySelector("#estado-atencion");
const hoy = document.querySelector("#hoy");
const textoEstado = document.querySelector("#texto-estado");

// Contenido: la fecha de hoy en texto
hoy.textContent = ahora.toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" });

// Atributo: la misma fecha en formato de máquina (AAAA-MM-DD) para el elemento <time>
const iso = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}-${String(ahora.getDate()).padStart(2, "0")}`;
hoy.setAttribute("datetime", iso);

// Clase y texto: abierto o cerrado (el texto dice lo mismo que el color)
const abierto = estaAbierto(ahora);
estado.classList.add(abierto ? "abierto" : "cerrado");
textoEstado.textContent = abierto ? "✔ abierto ahora" : "✖ cerrado ahora";
