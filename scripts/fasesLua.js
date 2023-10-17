// Defina a data
const data = new Date('2023-08-24');

// Obtenha o ano, mês e dia da data
const ano = data.getUTCFullYear() % 100; // Obtenha o ano (extraindo os dois últimos dígitos)
const mes = data.getUTCMonth() + 1; // Obtenha o mês (acrescente 1 porque janeiro é 0)
const dia = data.getUTCDate(); // Obtenha o dia

console.log(ano, mes, dia);

// Calcule o resultado
let resultado = (((ano + 2) * 11 + (dia + mes + 4)) % 30);
/* let resultado = dia + mes + 3; */
console.log(`O resultado é: ${resultado}`);

// Ajuste o resultado se for maior que 29
if (resultado > 28) {
    resultado -= 29;
}

console.log(`O resultado é: ${resultado}`);

// Determine a fase da lua com base no resultado
let faseDaLua = "";

if (resultado > 0 && resultado <= 7) {
    faseDaLua = "Lua Nova";
} else if (resultado > 7 && resultado <= 14) {
    faseDaLua = "Lua Crescente";
} else if (resultado > 14 && resultado <= 21) {
    faseDaLua = "Lua Cheia";
} else if (resultado > 21 && resultado <= 28) {
    faseDaLua = "Lua Minguante";
}

console.log(`A fase da lua é: ${faseDaLua}`);