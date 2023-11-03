// URL da API do IBGE para obter a lista de estados
const apiUrlEstados = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";

// Seletor para o select de estados
export const estadoSelect = document.getElementById("estado");

// Função para preencher o select de estados
function preencherSelectComEstados() {
    fetch(apiUrlEstados)
        .then(response => response.json())
        .then(data => {
            // Preencha o select de estados com os estados ordenados
            data.forEach(estado => {
                const option = document.createElement("option");
                option.value = estado.sigla;
                option.text = estado.nome;
                estadoSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar estados:", error);
        });
}

// Chame a função para preencher o select de estados quando a página for carregada
window.onload = function () {
    preencherSelectComEstados();
};