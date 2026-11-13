// G-06 · Paso 2 · Función que calcula algo del proyecto:
// la fecha aproximada en que estaría listo un trámite, contando solo días hábiles
// (de lunes a viernes; no descuenta feriados).

// Recibe la fecha en que se presenta el trámite y el plazo en días hábiles.
// Devuelve la fecha de entrega. Rechaza datos no válidos con un error.
function fechaDeEntrega(fechaInicio, diasHabiles) {
  if (!(fechaInicio instanceof Date) || Number.isNaN(fechaInicio.getTime())) {
    throw new Error("La fecha de inicio no es válida");
  }
  if (!Number.isInteger(diasHabiles) || diasHabiles < 1) {
    throw new Error("El plazo debe ser un número entero de días hábiles, mayor que 0");
  }
  const fecha = new Date(fechaInicio);
  let contados = 0;
  while (contados < diasHabiles) {
    fecha.setDate(fecha.getDate() + 1);
    const dia = fecha.getDay(); // 0 = domingo, 6 = sábado
    if (dia !== 0 && dia !== 6) {
      contados++;
    }
  }
  return fecha;
}

// Ejemplo: jueves 12/11/2026 → 13/11/2026
function formatoFecha(fecha) {
  return fecha.toLocaleDateString("es-PE", {
    weekday: "long", day: "2-digit", month: "2-digit", year: "numeric"
  });
}
