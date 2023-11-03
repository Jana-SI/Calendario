// exibir.js
import { gerarCalendario } from './calendario.js';
import { carregarFeriados, exibirFeriadosPorEstado } from "./feriados.js";
import { exibirEstacaoDoMes } from "./estacoesAno.js";
import { exibirFasesDaLua } from "./fasesLua.js";
import { calcularDataMaePai } from "./dia_maes_pais.js"

// Recupere os elementos do DOM
const estadoSelect = document.getElementById("estado");
const cidadeSelect = document.getElementById("cidade");
const mesSelect = document.getElementById("mes");
const verCalendarioButton = document.getElementById("verCalendario");
const calendarioContainer = document.getElementById("calendario");

// Adicione um ouvinte de eventos para os seletores
estadoSelect.addEventListener("change", validarSelecao);
cidadeSelect.addEventListener("change", validarSelecao);
mesSelect.addEventListener("change", validarSelecao);

// Adicione um ouvinte de eventos para os seletores
estadoSelect.addEventListener("change", validarSelecao);
cidadeSelect.addEventListener("change", validarSelecao);
mesSelect.addEventListener("change", validarSelecao);

function validarSelecao() {
    const estadoSelecionado = estadoSelect.value;
    const cidadeSelecionada = cidadeSelect.value;
    const mesSelecionado = mesSelect.value;

    // Verifique se os três seletores têm valores selecionados
    if (estadoSelecionado && cidadeSelecionada && mesSelecionado) {
        verCalendarioButton.disabled = false; // Ative o botão
    } else {
        verCalendarioButton.disabled = true; // Desative o botão
    }
}


// Adicione um ouvinte de eventos para o botão "Ver Calendário"
verCalendarioButton.addEventListener("click", () => {
    const estadoSelecionado = estadoSelect.value;
    const cidadeSelecionada = cidadeSelect.value;
    const mesSelecionado = mesSelect.value;

    // Verifique se os três seletores têm valores selecionados
    if (estadoSelecionado && cidadeSelecionada && mesSelecionado) {
        // Chame uma função para exibir o calendário com base nas escolhas do usuário
        exibirCalendario(estadoSelecionado, cidadeSelecionada, mesSelecionado);
    } else {
        alert("Por favor, escolha uma cidade e um mês antes de ver o calendário.");
    }
});

// Função para exibir o calendário com base na cidade e mês selecionados
function exibirCalendario(siglaEstado, cidade, mes) {
    // Verifique se a cidade e o mês foram selecionados
    if (siglaEstado && cidade && mes) {
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
        }

    } else {
        alert("Por favor, escolha uma cidade e um mês antes de ver o calendário.");
    }
}