// exibir.js
import { gerarCalendario } from './calendario.js';
import { carregarFeriados } from "./feriadosNacionais.js";
import { calcularEstacoesDoAno } from "./estacoesAno.js";

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
        exibirCalendario(cidadeSelecionada, mesSelecionado);
    } else {
        alert("Por favor, escolha uma cidade e um mês antes de ver o calendário.");
    }
});

// Função para exibir o calendário com base na cidade e mês selecionados
function exibirCalendario(cidade, mes) {
    // Verifique se a cidade e o mês foram selecionados
    if (cidade && mes) {
        // Chame a função gerarCalendario para exibir o calendário
        const anoAtual = new Date().getFullYear();
        calendarioContainer.innerHTML = gerarCalendario(anoAtual, mes);
        carregarFeriados(anoAtual, mes);
        calcularEstacoesDoAno(mes);
    } else {
        alert("Por favor, escolha uma cidade e um mês antes de ver o calendário.");
    }
}