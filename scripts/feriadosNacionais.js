// Função para carregar feriados do mês selecionado
export function carregarFeriados(anoAtual, mesSelecionado) {
  const feriadosDiv = document.getElementById('feriados');

  const url = `https://date.nager.at/api/v3/PublicHolidays/${anoAtual}/BR`;

  fetch(url)
    .then((response) => response.json())
    .then((feriados) => {
      feriadosDiv.innerHTML = '';

      feriados.forEach((feriado) => {
        const dataFeriado = new Date(feriado.date);
        dataFeriado.setUTCHours(0, 0, 0, 0); // Defina o fuso horário para UTC
        const diaFeriado = dataFeriado.getUTCDate();
        const mesFeriado = dataFeriado.getUTCMonth() + 1; // Adicione 1 ao mês
        const anoFeriado = dataFeriado.getUTCFullYear();

        if (mesFeriado === parseInt(mesSelecionado, 10)) {
          const diaFeriadoFormatado = diaFeriado.toString().padStart(2, '0');
          const mesFeriadoFormatado = mesFeriado.toString().padStart(2, '0');
          const feriadoElement = document.createElement('div');
          feriadoElement.textContent = `${diaFeriadoFormatado}/${mesFeriadoFormatado}/${anoFeriado}: ${feriado.localName}`;
          feriadosDiv.appendChild(feriadoElement);
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar feriados:", error);
    });
}
