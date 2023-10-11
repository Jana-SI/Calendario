// Função para carregar feriados do mês selecionado
export function carregarFeriados(anoAtual, mesSelecionado) {

    if (mesSelecionado) {
        const url = `https://date.nager.at/api/v3/PublicHolidays/${anoAtual}/BR`;

        fetch(url)
            .then(response => response.json())
            .then(feriados => {
                const feriadosElement = document.getElementById("feriados");
                feriadosElement.innerHTML = "";

                if (feriados.length > 0) {
                    feriadosElement.innerHTML = "<h2>Feriados:</h2>";

                    // Filtrar feriados para o mês selecionado
                    const feriadosDoMes = feriados.filter(feriado => {
                        const dataFeriado = new Date(feriado.date);
                        return dataFeriado.getMonth() + 1 == mesSelecionado && dataFeriado.getFullYear() == anoAtual; // Verificar o mês e o ano
                    });

                    if (feriadosDoMes.length > 0) {
                        feriadosDoMes.forEach(feriado => {
                            feriadosElement.innerHTML += `<p>${feriado.date}: ${feriado.localName}</p>`;
                        });
                    } else {
                        feriadosElement.innerHTML = "<p>Nenhum feriado encontrado para o mês selecionado.</p>";
                    }
                } else {
                    feriadosElement.innerHTML = "<p>Nenhum feriado encontrado para o mês selecionado.</p>";
                }
            })
            .catch(error => {
                console.error("Erro ao carregar feriados:", error);
            });
    }
}