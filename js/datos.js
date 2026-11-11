// Datos de prueba ficticios (no son costos ni expedientes reales de la municipalidad).
const TRAMITES = [
  { id: "licencia-funcionamiento", nombre: "Licencia de funcionamiento", area: "Subgerencia de Licencias",
    costo: 120.50, plazo: "15 días hábiles",
    requisitos: ["Solicitud con carácter de declaración jurada", "Copia del DNI del solicitante", "Número de RUC", "Croquis de ubicación del local"] },
  { id: "certificado-itse", nombre: "Certificado de inspección técnica de seguridad (ITSE)", area: "Subgerencia de Gestión del Riesgo",
    costo: 98.00, plazo: "9 días hábiles",
    requisitos: ["Solicitud de inspección", "Plano de distribución del local", "Constancia de pago"] },
  { id: "licencia-edificacion", nombre: "Licencia de edificación", area: "Gerencia de Desarrollo Urbano",
    costo: 350.00, plazo: "20 días hábiles",
    requisitos: ["Formulario único de edificación (FUE)", "Copia literal de dominio", "Planos de arquitectura firmados"] },
  { id: "copia-partida", nombre: "Copia certificada de partida de nacimiento", area: "Registro Civil",
    costo: 10.00, plazo: "1 día hábil",
    requisitos: ["Número de DNI o datos del inscrito", "Constancia de pago"] },
  { id: "matrimonio-civil", nombre: "Matrimonio civil", area: "Registro Civil",
    costo: 85.00, plazo: "8 días hábiles",
    requisitos: ["Copia del DNI de los contrayentes", "Partidas de nacimiento", "Certificado médico prenupcial", "Declaración de dos testigos"] },
  { id: "registro-canes", nombre: "Registro municipal de canes", area: "Subgerencia de Salud",
    costo: 15.00, plazo: "1 día hábil",
    requisitos: ["Copia del DNI del propietario", "Carné de vacunación del can", "Foto del can"] }
];

const EXPEDIENTES = {
  "0001": { estado: "En revisión", tramite: "Licencia de funcionamiento", ingreso: "10/09/2026", area: "Subgerencia de Licencias" },
  "0002": { estado: "Listo para recoger", tramite: "Copia certificada de partida de nacimiento", ingreso: "11/09/2026", area: "Registro Civil" }
};

// Lo que guarda el administrador se aplica encima de los datos (solo en esta pestaña del navegador).
function leerCambios() {
  try { return JSON.parse(sessionStorage.getItem("cambios") || "{}"); } catch (e) { return {}; }
}
function guardarCambio(id, datos) {
  try {
    const c = leerCambios(); c[id] = datos; sessionStorage.setItem("cambios", JSON.stringify(c)); return true;
  } catch (e) { return false; }
}
function tramites() {
  const c = leerCambios();
  return TRAMITES.map(t => Object.assign({}, t, c[t.id] || {}));
}
function soles(n) { return "S/ " + Number(n).toFixed(2); }
function parametro(nombre) { return new URLSearchParams(location.search).get(nombre); }
function sesionIniciada() { try { return sessionStorage.getItem("sesion") === "admin"; } catch (e) { return false; } }
