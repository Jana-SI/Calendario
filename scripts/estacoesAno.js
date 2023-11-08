export function exibirEstacaoDoMes(mes, ano) {
    const mesStr = mes.toString();

    fetch('./data/estacoes_ano.json')
        .then(response => response.json())
        .then(data => {
            const estacoesData = data; // Assume que o arquivo JSON tem a estrutura correta

            const estacaoData = estacoesData[ano][mesStr];

            if (!estacaoData) {
                console.log('Não foi encontrada nenhuma estação para o mês e ano especificados.');
                return;
            }

            const estacao = Object.keys(estacaoData)[0];
            const dataHora = estacaoData[estacao];

            const elementoHtml = document.getElementById("estacaoDoMes");
            elementoHtml.innerHTML = "";

            if (dataHora && dataHora.data && dataHora.hora) {
                elementoHtml.textContent = `Estação: ${estacao}, Data: ${dataHora.data}, Hora: ${dataHora.hora}`;
            } else {
                elementoHtml.textContent = `Estação: ${estacao}`;
            }

        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}