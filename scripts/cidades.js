// Seletor para o select de cidades
const cidadeSelect = document.getElementById("cidade");

// Importe o seletor para o select de estados de estados.js
import { estadoSelect } from './estados.js';

// Função para preencher o select de cidades com base no estado selecionado
function preencherSelectComCidades() {
    // Limpe as opções atuais do select de cidades
    cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';

    // Obtenha o ID do estado selecionado
    const estadoSelecionado = estadoSelect.value;

    // Verifique se um estado foi selecionado
    if (estadoSelecionado) {
        // URL da API do IBGE para obter as cidades do estado selecionado
        const apiUrlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`;

        // Faça uma solicitação à API para obter as cidades do estado selecionado
        fetch(apiUrlCidades)
            .then(response => response.json())
            .then(data => {
                // Preencha o select de cidades com as cidades do estado
                data.forEach(cidade => {
                    const option = document.createElement("option");
                    option.value = cidade.nome;
                    option.text = cidade.nome;
                    cidadeSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Erro ao buscar cidades:", error);
            });
    }
}

// Adicione um ouvinte de eventos para o select de estados
estadoSelect.addEventListener("change", preencherSelectComCidades);