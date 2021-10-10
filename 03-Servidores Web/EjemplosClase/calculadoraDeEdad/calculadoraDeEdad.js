const moment = require("moment");

const hoy = moment();
const nacimiento = moment("04/08/2002", "DD/MM/YYYY");

const difYear = hoy.diff(nacimiento,"years");

const difDays = hoy.diff(nacimiento,"days");

console.log(`Hoy es ${hoy.format("DD/MM/YYYY")}`);
console.log(`Nací el ${nacimiento.format("DD/MM/YYYY")}`);
console.log(`Desde mi nacimiento han pasado ${difYear} años`);
console.log(`Desde mi nacimiento han pasados ${difDays} días`);
