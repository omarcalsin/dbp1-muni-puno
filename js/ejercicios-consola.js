// G-06 · Paso 1 · Ejercicios de la consola (copiados de la guía).
// Se ven en la consola del navegador (F12 → Consola) al abrir ejercicios.html.

// Ejercicio 1 · variables y tipos
const destino = "Isla Taquile";
let pasajeros = 12;
pasajeros += 3;
console.log(typeof destino, typeof pasajeros);
console.log(`${destino}: ${pasajeros} pasajeros`);

// Ejercicio 2 · operadores
console.log("3" + 2, "3" * 2);
console.log("3" === 3, Number("3") + 2);

// Ejercicio 3 · estructuras de control
for (let mes = 6; mes <= 9; mes++) {
  const temporada = mes === 7 || mes === 8 ? "alta" : "baja";
  console.log(`Mes ${mes}: temporada ${temporada}`);
}

// Ejercicio 4 · cuántos botes para 23 personas, si en cada uno caben 8
const personas = 23;
const capacidad = 8;
const botes = Math.ceil(personas / capacidad);
const enElUltimo = personas % capacidad;
console.log(`Se necesitan ${botes} botes; en el último viajan ${enElUltimo} personas.`);
