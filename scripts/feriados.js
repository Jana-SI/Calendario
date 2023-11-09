// Função para carregar feriados do mês selecionado
export function carregarFeriados(anoAtual, mesSelecionado) {
  const feriadosDiv = document.getElementById('feriadosNacionais');

  const url = `https://date.nager.at/api/v3/PublicHolidays/${anoAtual}/BR`;

  fetch(url)
    .then((response) => response.json())
    .then((feriados) => {
      feriadosDiv.innerHTML = '';
      document.getElementById("feriadosNacionais").style.display = "none";

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
          document.getElementById("feriadosNacionais").style.display = "block";
        }

      });
    })
    .catch((error) => {
      console.error("Erro ao carregar feriados:", error);
    });
}


export function exibirFeriadosPorEstado(siglaEstado, mes) {

  const feriadosEstaduais = './data/feriadosEstaduais.json';

  fetch(feriadosEstaduais)
    .then(response => response.json())
    .then(data => {

      // Limpe o conteúdo anterior na div
      document.getElementById('feriadosEstaduais').innerHTML = '';

      // Encontre o estado com a sigla correspondente
      const estado = data.estados.find(e => e.sigla === siglaEstado);

      if (estado && estado.feriados) {
        // Filtra os feriados no mês desejado
        const feriadosNoMes = estado.feriados.filter(feriado => {
          const [feriadoDia, feriadoMes] = feriado.data.split('/');
          return parseInt(feriadoMes) === parseInt(mes);
        });

        // Construa o HTML com a lista de feriados
        let feriadosTexto = '';
        feriadosNoMes.forEach(feriado => {
          const [feriadoDia, feriadoMes] = feriado.data.split('/');
          const feriadoFormatado = `${feriadoDia}/${feriadoMes}: ${feriado.nome}`;
          feriadosTexto += feriadoFormatado + '\n'; // Adiciona uma quebra de linha para separar os feriados
        });

        if (feriadosTexto === '') {
          document.getElementById("feriadosEstaduais").style.display = "none";
        } else {
          // Exiba o HTML na página
          document.getElementById('feriadosEstaduais').innerText = feriadosTexto;
          document.getElementById("feriadosEstaduais").style.display = "block";
        }


      } else {
        console.error("Estado não encontrado");
      }

    }).catch(error => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });

}