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


export function exibirFeriadosPorEstado(siglaEstado, mes) {

  const feriadosEstaduais = './data/feriadosEstaduais.json';

  console.log(siglaEstado, mes);

  fetch(feriadosEstaduais)
    .then(response => response.json())
    .then(data => {

      // Encontre o estado com a sigla correspondente
      const estado = data.estados.find(e => e.sigla === siglaEstado);
      console.log(estado);

      if (estado) {
        // Filtra os feriados no mês desejado
        const feriadosNoMes = estado.feriados.filter(feriado => {
          const [feriadoDia, feriadoMes] = feriado.data.split('/');
          return parseInt(feriadoMes) === parseInt(mes);
        });

        console.log(feriadosNoMes);

        // Limpe o conteúdo anterior na div
        document.getElementById('feriadosEstaduais').innerHTML = '';

        // Construa o HTML com a lista de feriados
        let html = '<ul>';
        feriadosNoMes.forEach(feriado => {
          const [feriadoDia, feriadoMes] = feriado.data.split('/');
          const feriadoFormatado = `${feriadoDia}/${feriadoMes}: ${feriado.nome}`;
          html += `<li>${feriadoFormatado}</li>`;
        });
        html += '</ul>';


        // Exiba o HTML na página
        document.getElementById('feriadosEstaduais').innerHTML = html;
      } else {
        console.error("Estado não encontrado");
      }

    }).catch(error => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });

}