// Inicio de sesión del personal (login.html, HU-05).

const formLogin = document.getElementById("form");
const campoUsuario = document.getElementById("usuario");
const campoClave = document.getElementById("clave");

function validarRequerido(campo, textoFaltante) {
  const err = document.getElementById("err-" + campo.id);
  if (campo.value.trim() === "") {
    err.textContent = "⚠ " + textoFaltante;
    err.hidden = false;
    campo.setAttribute("aria-invalid", "true");
    return false;
  }
  err.textContent = "";
  err.hidden = true;
  campo.removeAttribute("aria-invalid");
  return true;
}

formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const okUsuario = validarRequerido(campoUsuario, "Escriba su usuario.");
  const okClave = validarRequerido(campoClave, "Escriba su contraseña.");
  if (!okUsuario || !okClave) return;
  try { sessionStorage.setItem("sesion", "admin"); } catch (e) {}
  location.href = "admin.html";
});

formLogin.addEventListener("input", (ev) => {
  const campo = ev.target;
  if (campo.getAttribute("aria-invalid") === "true") {
    validarRequerido(campo, campo.id === "usuario" ? "Escriba su usuario." : "Escriba su contraseña.");
  }
});
