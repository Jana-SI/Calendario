export async function gerarCalendario(ano, mes) {
  const diasNoMes = new Date(ano, mes, 0).getDate();
  const primeiraSemana = new Date(ano, mes - 1, 1).getDay();
  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const nomeDoMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(ano, mes - 1, 1));
  const nomeDoMesCapitalizado = nomeDoMes.charAt(0).toUpperCase() + nomeDoMes.slice(1);

  let calendarioHTML = `<table class="table table-borderless"><tr>`;
  
  calendarioHTML += `<th colspan="7" class="text-center" id="mesSelecionado"><h3>${nomeDoMesCapitalizado}</h3></th></tr><tr>`;

  for (let diaSemana = 0; diaSemana < 7; diaSemana++) {
    const classeDomingo = diaSemana === 0 ? 'domingo' : 'dia-semana';
    calendarioHTML += `<th class="${classeDomingo}">${diasDaSemana[diaSemana]}</th>`;
  }
  
  calendarioHTML += `</tr><tr>`;

  try {
    const feriados = await obterFeriados(ano);

    for (let i = 0; i < primeiraSemana; i++) {
      const classeDomingo = i === 0 ? 'domingo' : 'outro-dia';
      calendarioHTML += `<td class="${classeDomingo}"></td>`;
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(ano, mes - 1, dia);
      const formatoData = data.toISOString().split('T')[0];

      if (feriados.includes(formatoData)) {
        const classeDomingo = (dia + primeiraSemana - 1) % 7 === 0 ? 'feriadosNacionaisTabela' : 'feriadosNacionaisTabela';
        calendarioHTML += `<td class="${classeDomingo}">${dia}</td>`;
      } else {
        const classeDomingo = (dia + primeiraSemana - 1) % 7 === 0 ? 'domingo' : 'outro-dia';
        calendarioHTML += `<td class="${classeDomingo}">${dia}</td>`;
      }

      if ((dia + primeiraSemana) % 7 === 0) {
        calendarioHTML += `</tr><tr>`;
      }
    }

    calendarioHTML += `</tr></table>`;
    return calendarioHTML;

  } catch (erro) {
    console.error('Erro ao obter feriados:', erro);
    return '';
  }
}

/* pegando feriados */
async function obterFeriados(anoAtual) {
  try {
    const resposta = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${anoAtual}/BR`);
    const dados = await resposta.json();

    // A resposta da API contém um array de objetos, onde cada objeto representa um feriado.
    // Vamos extrair apenas os nomes dos feriados para formar um array.
    const feriados = dados.map(feriado => feriado.date);

    return feriados;
    
  } catch (erro) {
    console.error('Erro ao obter feriados:', erro);
    return [];
  }
}