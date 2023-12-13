// exibir.js
import { gerarCalendario } from './calendario.js';
import { carregarFeriados, exibirFeriadosPorEstado } from "./feriados.js";
import { exibirEstacaoDoMes } from "./estacoesAno.js";
import { exibirFasesDaLua } from "./fasesLua.js";
import { calcularDataMaePai } from "./dia_maes_pais.js"

// Recupere os elementos do DOM
const estadoSelect = document.getElementById("estado");
const mesExibir = document.getElementById("mesExibir");
const mesSelect = document.getElementById("mes");
const colunaPrincipal = document.getElementById("colunaPrincipal");
const calendarioContainer = document.getElementById("calendario");

const divEstadoSelecionado = document.getElementById("estadoSelecionado");

// Ocultar o select de mês inicialmente
mesExibir.style.display = "none";

estadoSelect.addEventListener("change", function () {
  const estadoSelecionado = estadoSelect.options[estadoSelect.selectedIndex].text;
  divEstadoSelecionado.textContent = `Estado: ${estadoSelecionado}`;

  // Exibir o select de mês após a seleção do estado
  mesExibir.style.display = estadoSelecionado ? "block" : "none";

  // Ajustar a largura da coluna com base na presença do estado selecionado
  colunaPrincipal.classList.remove("col-sm-6", "offset-sm-3", "col-md-6", "offset-md-3", "col-lg-6", "offset-lg-3");

  if (estadoSelecionado) {
    colunaPrincipal.classList.add("col-sm-10", "offset-sm-1", "col-md-10", "offset-md-1", "col-lg-10", "offset-lg-1");
  } else {
    colunaPrincipal.classList.add("col-sm-6", "offset-sm-3", "col-md-6", "offset-md-3", "col-lg-6", "offset-lg-3");
  }

});

// Adicione um ouvinte de eventos para os seletores
estadoSelect.addEventListener("change", validarSelecao);
mesSelect.addEventListener("change", validarSelecao);

function validarSelecao() {
  const estadoSelecionado = estadoSelect.value;
  const mesSelecionado = mesSelect.value;

  // Verificar se ambos os selects foram escolhidos
  if (estadoSelecionado && mesSelecionado) {
    exibirCalendario(estadoSelecionado, mesSelecionado); // Chamar a função para exibir o calendário
  }
}

// Função para exibir o calendário com base na cidade e mês selecionados
async function exibirCalendario(siglaEstado, mes) {
  // Mostrar o loader
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  // Ocultar todas as colunas enquanto carrega
  document.getElementById("colCalendario").style.display = "none";
  document.getElementById("colLista").style.display = "none";

  // Verifique se o estado e o mês foram selecionados
  if (siglaEstado && mes) {
    // Chame a função gerarCalendario para exibir o calendário
    const anoAtual = new Date().getFullYear();
    const calendarioHTML = await gerarCalendario(anoAtual, mes, siglaEstado);

    calendarioContainer.innerHTML = calendarioHTML;

    carregarFeriados(anoAtual, mes);

    exibirFeriadosPorEstado(siglaEstado, mes);

    exibirEstacaoDoMes(mes, anoAtual);

    exibirFasesDaLua(anoAtual, mes);

    mes = parseInt(mes); // Converte a string para um número

    if (mes === 5 || mes === 8) {
      const maesOuPaisElement = document.getElementById("maes_ou_pais");
      maesOuPaisElement.textContent = calcularDataMaePai(mes, anoAtual);

      maesOuPaisElement.style.display = "block";
    } else {
      document.getElementById("maes_ou_pais").style.display = "none";
    }

    // Aguarde 5000 milissegundos (5 segundos) antes de ocultar o loader e exibir as colunas
    setTimeout(() => {
      // Ocultar o loader
      loader.style.display = "none";

      // Exibir as colunas
      document.getElementById("colCalendario").style.display = "block";
      document.getElementById("colLista").style.display = "block";
    }, 1000);
  } else {
    // Esconder o loader em caso de erro
    loader.style.display = "none";
    alert("Por favor, escolha um estado e um mês antes de ver o calendário.");
  }
}
