// Recupere os elementos do DOM
const cidadeSelect = document.getElementById("cidade");
const mesSelect = document.getElementById("mes");
const verCalendarioButton = document.getElementById("verCalendario");
const calendarioContainer = document.getElementById("calendario");

// Adicione um ouvinte de eventos para os seletores
cidadeSelect.addEventListener("change", validarSelecao);
mesSelect.addEventListener("change", validarSelecao);

function validarSelecao() {
    // Verifique se ambos os seletores têm valores selecionados
    if (cidadeSelect.value !== "" && mesSelect.value !== "") {
        verCalendarioButton.disabled = false; // Ative o botão
    } else {
        verCalendarioButton.disabled = true; // Desative o botão
    }
}

// Adicione um ouvinte de eventos para o botão "Ver Calendário"
verCalendarioButton.addEventListener("click", () => {
    // Obtenha os valores selecionados
    const cidadeSelecionada = cidadeSelect.value;
    const mesSelecionado = mesSelect.value;

    // Verifique se a cidade e o mês foram selecionados
    if (cidadeSelecionada && mesSelecionado) {
        // Chame uma função para exibir o calendário com base nas escolhas do usuário
        exibirCalendario(cidadeSelecionada, mesSelecionado);
    } else {
        alert("Por favor, escolha uma cidade e um mês antes de ver o calendário.");
    }
});

// Função para exibir o calendário com base na cidade e mês selecionados
function exibirCalendario(cidade, mes) {
    // Aqui você pode adicionar a lógica para exibir o calendário.
    // Isso pode incluir a busca de feriados específicos para a cidade e mês selecionados e a renderização do calendário na área "calendarioContainer".
    
    // Por enquanto, vamos simplesmente exibir uma mensagem de exemplo
    const mensagemExemplo = `Calendário para ${mes} em ${cidade}`;
    calendarioContainer.innerHTML = `<p>${mensagemExemplo}</p>`;
    
    // Você pode implementar a lógica real para exibir o calendário aqui
}
