export function exibirEstacaoDoMes(mes, ano) {

    mes = Number(mes);
    ano = Number(ano);

    fetch('./data/estacoes_ano.json')
        .then(response => response.json())
        .then(data => {
            const estacoesAno = data[ano];
            const estacaoDoMesElement = document.getElementById('estacaoDoMes');

            if (estacoesAno) {
                // Iterar sobre as estações do ano
                for (const estacao in estacoesAno) {
                    const dataEstacao = estacoesAno[estacao].data;
                    const [dia, mesEstacao] = dataEstacao.split('/');
                    const dataEstacaoObj = new Date(ano, mesEstacao - 1, dia);

                    // Verificar se o mês passado pelo usuário corresponde à estação
                    if (dataEstacaoObj.getMonth() + 1 === mes) {

                        // Modificando a preposição 'do' ou 'da' com base na estação
                        let preposicao = "do";
                        if (estacao.toLowerCase() === "primavera") {
                            preposicao = "da";
                        }

                        // Exibe os detalhes da estação no HTML
                        estacaoDoMesElement.innerHTML = `<img class="estacao" src="${estacoesAno[estacao].img}" alt="${estacao}"> Início ${preposicao} ${estacao}, Data:  ${dataEstacao}, Hora: ${estacoesAno[estacao].hora}`;
                        estacaoDoMesElement.style.display = 'block';
                        return;
                    }
                }

                estacaoDoMesElement.style.display = 'none';
            } else {
                console.error('Ano não encontrado no arquivo JSON.');
                estacaoDoMesElement.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}