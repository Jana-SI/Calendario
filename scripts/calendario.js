export async function gerarCalendario(ano, mes, siglaEstado) {
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
    const feriadosNacionais = await obterFeriadosNacionais(ano);
    const feriadosEstaduais = await obterFeriadosEstaduais(siglaEstado);

    for (let i = 0; i < primeiraSemana; i++) {
      const classeDomingo = i === 0 ? 'domingo' : 'outro-dia';
      calendarioHTML += `<td class="${classeDomingo}"></td>`;
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(ano, mes - 1, dia);
      const formatoDataFN = data.toISOString().split('T')[0];
      const adicionaZero = (numero) => (numero < 10 ? `0${numero}` : numero);

      const formatoDataFE = `${adicionaZero(data.getDate())}/${adicionaZero(data.getMonth() + 1)}`;

      let classeCelula = ''; // Inicializa a classe da célula

      if (Number(mes) === 5 || Number(mes) === 8) {
        const diaDasMaesOuPais = calcularDataMaePai(Number(mes), ano);

        if (dia === diaDasMaesOuPais) {
          classeCelula = 'maes_ou_pais';
        } else {
          classeCelula = (dia + primeiraSemana - 1) % 7 === 0 ? 'domingo' : 'outro-dia';
        }
      }

      if (feriadosNacionais.includes(formatoDataFN)) {
        classeCelula = 'feriadosNacionaisTabela';
      } else if (feriadosEstaduais.includes(formatoDataFE)) {
        classeCelula = 'feriadosEstaduaisTabela';
      } else if (!classeCelula) {
        classeCelula = (dia + primeiraSemana - 1) % 7 === 0 ? 'domingo' : 'outro-dia';
      }


      calendarioHTML += `<td class="${classeCelula}">${dia}</td>`;

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

/* pegando feriados nacionais */
async function obterFeriadosNacionais(anoAtual) {
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

/* pegando feriados estaduais */
async function obterFeriadosEstaduais(sigla) {
  const caminhoDoArquivo = './data/feriadosEstaduais.json';

  return fetch(caminhoDoArquivo)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o arquivo JSON. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const estadoEncontrado = data.estados.find(estado => estado.sigla === sigla);

      if (estadoEncontrado) {
        const feriados = estadoEncontrado.feriados.map(feriado => feriado.data);
        return feriados;
      } else {
        console.log(`Estado com sigla ${sigla} não encontrado.`);
        return [];
      }
    })
    .catch(erro => {
      console.error('Erro ao carregar o arquivo JSON:', erro);
      return [];
    });
}

/* dia das maes ou pais */
function calcularDataMaePai(mes, ano) {
  if (mes === 5) { // Maio
    const primeiroDeMaio = new Date(ano, mes - 1, 1);
    const diaDaSemana = primeiroDeMaio.getDay();
    const diasAtePrimeiroDomingo = 7 - diaDaSemana;
    const segundoDomingo = new Date(ano, mes - 1, 8 + diasAtePrimeiroDomingo);

    console.log('Dia das Mães:', segundoDomingo.getDate());

    return segundoDomingo.getDate();
  } else if (mes === 8) { // Agosto
    const primeiroDeAgosto = new Date(ano, mes - 1, 1);
    const diaDaSemana = primeiroDeAgosto.getDay();
    const diasAteSegundoDomingo = 14 - diaDaSemana;
    const segundoDomingo = new Date(ano, mes - 1, diasAteSegundoDomingo + 1);

    console.log('Dia dos Pais:', segundoDomingo.getDate());

    return segundoDomingo.getDate();
  }
}