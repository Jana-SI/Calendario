// Obtenha os elementos com a classe "anoAtual"
const anoAtualElements = document.querySelectorAll(".anoAtual");

// Obtenha o ano atual
const anoAtual = new Date().getFullYear();

// Atualize o conteúdo de todos os elementos com a classe "anoAtual" com o ano atual
anoAtualElements.forEach(element => {
  element.textContent = anoAtual;
});