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
            const paragrafo = document.createElement("p");

            if (dataHora && dataHora.data && dataHora.hora) {

                paragrafo.textContent = `Estação: ${estacao}, Data: ${dataHora.data}, Hora: ${dataHora.hora}`;
                elementoHtml.appendChild(paragrafo);

                console.log(`Estação: ${estacao}, Data: ${dataHora.data}, Hora: ${dataHora.hora}`);

            } else {

                paragrafo.textContent = `Estação: ${estacao}`;
                elementoHtml.appendChild(paragrafo);
                console.log(`Estação: ${estacao}`);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}