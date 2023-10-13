function calcularProximaEstacao(mesSelecionado) {
    const estacoes = {
        1: "Verão",
        2: "Verão",
        3: "Outono",
        4: "Outono",
        5: "Outono",
        6: "Inverno",
        7: "Inverno",
        8: "Inverno",
        9: "Primavera",
        10: "Primavera",
        11: "Primavera",
        12: "Verão",
    };

    const estacaoAtual = estacoes[mesSelecionado];
    const proximaEstacao =
        mesSelecionado === 12 ? estacoes[1] : estacoes[mesSelecionado + 1];

    return proximaEstacao;
}

function calcularDataInicioProximaEstacao(mesSelecionado) {
    const estimativaAno = new Date().getFullYear();
    const proximaEstacao = calcularProximaEstacao(mesSelecionado);

    // Ajuste as datas para o hemisfério sul (Brasil)
    switch (proximaEstacao) {
        case "Verão":
            return new Date(estimativaAno, 0, 23); // Estimativa para o início do verão
        case "Outono":
            return new Date(estimativaAno, 3, 21); // Estimativa para o início do outono
        case "Inverno":
            return new Date(estimativaAno, 6, 21); // Estimativa para o início do inverno
        case "Primavera":
            return new Date(estimativaAno, 9, 23); // Estimativa para o início da primavera
        default:
            return null;
    }
}

export function calcularEstacoesDoAno(mes) {
    const mesSelecionado = parseInt(mes, 10); // Use 'mes' como parâmetro
    const proximaEstacao = calcularProximaEstacao(mesSelecionado);
const dataInicioProximaEstacao = calcularDataInicioProximaEstacao(mesSelecionado);
    
    const elementoEstacao = document.getElementById("estacao-do-ano");
    const elementoDataInicio = document.getElementById("data-inicio-estacao");

    elementoEstacao.textContent = `Estamos no mês de ${proximaEstacao}`;
    elementoDataInicio.textContent = `A estação começa aproximadamente em: ${dataInicioProximaEstacao.toLocaleDateString()}`;
}