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
                        let classeE = '';

                        if (estacao.toLowerCase() === "primavera") {
                            preposicao = "da";
                            classeE = 'estacao_primavera_li';
                        }

                        if (estacao.toLowerCase() === "verão") {
                            classeE = 'estacao_verao_li';
                        }

                        if (estacao.toLowerCase() === "outono") {
                            classeE = 'estacao_outono_li';
                        }

                        if (estacao.toLowerCase() === "inverno") {
                            classeE = 'estacao_inverno_li';
                        }

                        // Exibe os detalhes da estação no HTML
                        estacaoDoMesElement.innerHTML = `<img class="estacao" src="${estacoesAno[estacao].img}" alt="${estacao}"> <span class="${classeE}">Início ${preposicao} ${estacao}, Data:  ${dataEstacao}, Hora: ${estacoesAno[estacao].hora}</span>`;
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