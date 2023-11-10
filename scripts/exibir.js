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
const calendarioContainer = document.getElementById("calendario");

const divEstadoSelecionado = document.getElementById("estadoSelecionado");

// Ocultar o select de mês inicialmente
mesExibir.style.display = "none";

estadoSelect.addEventListener("change", function() {
    const estadoSelecionado = estadoSelect.options[estadoSelect.selectedIndex].text;
    divEstadoSelecionado.textContent = `Estado: ${estadoSelecionado}`;

    // Exibir o select de mês após a seleção do estado
    mesExibir.style.display = "block";
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
function exibirCalendario(siglaEstado, mes) {

    // Verifique se o estado e o mês foram selecionados
    if (siglaEstado && mes) {

        // Chame a função gerarCalendario para exibir o calendário
        const anoAtual = new Date().getFullYear();

        calendarioContainer.innerHTML = gerarCalendario(anoAtual, mes);

        carregarFeriados(anoAtual, mes);

        exibirFeriadosPorEstado(siglaEstado, mes)

        exibirEstacaoDoMes(mes, anoAtual);

        exibirFasesDaLua(anoAtual, mes);

        mes = parseInt(mes); // Converte a string para um número

        if (mes === 5 || mes === 8) {
            document.getElementById("maes_ou_pais").textContent = calcularDataMaePai(mes, anoAtual);
            document.getElementById("maes_ou_pais").style.display = "block";
        } else {
            document.getElementById("maes_ou_pais").textContent = "";
            document.getElementById("maes_ou_pais").style.display = "none";
        }

    } else {
        alert("Por favor, escolha um estado e um mês antes de ver o calendário.");
    }
}