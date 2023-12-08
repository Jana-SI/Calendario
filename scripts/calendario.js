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
    const estacoes = await obterEstacoes(ano);
    const fasesDaLua = await obterFasesDaLua(ano, mes);

    for (let i = 0; i < primeiraSemana; i++) {
      const classeDomingo = i === 0 ? 'domingo' : 'outro-dia';
      calendarioHTML += `<td class="${classeDomingo}"></td>`;
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(ano, mes - 1, dia);
      const formatoDataFN = data.toISOString().split('T')[0];
      const adicionaZero = (numero) => (numero < 10 ? `0${numero}` : numero);
      const formatoDataFE = `${adicionaZero(data.getDate())}/${adicionaZero(data.getMonth() + 1)}`;
      const dataFormatadaFasesDaLua = `${ano}-${adicionaZero(data.getMonth() + 1)}-${adicionaZero(data.getDate())}`;

      let classeCelula = ''; // Inicializa a classe da célula
      let classeCelulaF = ''; // Inicializa a classe da célula
      let classeCelulaL = '';
      let classeCelulaE = '';

      /* let imagemEstacao = ''; // Inicializa o caminho da imagem */
      let descricaoEstacao = '';

      /* let imagemFaseLua = ''; // Inicializa o caminho da imagem
      let descricaoLua = ''; */

      if (feriadosNacionais.includes(formatoDataFN)) {

        classeCelulaF = 'feriadosNacionaisTabela';

      } else if (feriadosEstaduais.includes(formatoDataFE)) {

        classeCelulaF = 'feriadosEstaduaisTabela';

      } else if (Number(mes) === 5 || Number(mes) === 8) {

        const diaDasMaesOuPais = calcularDataMaePai(Number(mes), ano);

        if (dia === diaDasMaesOuPais) {
          classeCelulaF = 'maes_ou_pais';
        } else {
          classeCelulaF = ''
        }

      }

      const estacaoDoMes = estacoes.find(estacao => estacao.dataInicio.getMonth() + 1 === Number(mes));

      if (estacaoDoMes) {
        const diaInicioEstacao = estacaoDoMes.dataInicio.getDate();

        if (dia === diaInicioEstacao) {
          /* imagemEstacao = estacaoDoMes.img; */
          descricaoEstacao = estacaoDoMes.estacao;

          if (descricaoEstacao === 'Primavera') {
            classeCelulaE = 'estacao_primavera';
          }

          if (descricaoEstacao === 'Verão') {
            classeCelulaE = 'estacao_verao';
          }
          if (descricaoEstacao === 'Outono') {
            classeCelulaE = 'estacao_outono';
          }
          if (descricaoEstacao === 'Inverno') {
            classeCelulaE = 'estacao_inverno';
          }
        }
      }

      if (fasesDaLua.some(fase => fase.data === dataFormatadaFasesDaLua)) {

        /* const faseDaLua = fasesDaLua.find(fase => fase.data === dataFormatadaFasesDaLua);

        descricaoLua = faseDaLua.fase;
        imagemFaseLua = faseDaLua.img; // Obtém o caminho da imagem da fase da lua */

        classeCelulaL = 'moon-phase';

      } if (!classeCelula) {
        classeCelula = (dia + primeiraSemana - 1) % 7 === 0 ? 'domingo' : 'outro-dia';
      }

      calendarioHTML += `<td class="${classeCelula}">`;
      
      if (classeCelulaF) {
        calendarioHTML += `<span class="${classeCelulaF}">${dia}</span>`;
      } else if (classeCelulaE) {
        calendarioHTML += `<span class="${classeCelulaE}">${dia}</span>`;
        /* calendarioHTML += `<img src="${imagemEstacao}" alt="${descricaoEstacao}" class="estacao">`; */
      } else if (classeCelulaL) {
        calendarioHTML += `<span class="${classeCelulaL}">${dia}</span>`;
        /* calendarioHTML += `<img src="${imagemFaseLua}" alt="${descricaoLua}" class="moon-phase-image">`; */
      } else {
        calendarioHTML += `${dia}`;
      }

      calendarioHTML += `</td>`;

      if ((dia + primeiraSemana) % 7 === 0) {
        calendarioHTML += `</tr><tr>`;
      }

    }

    calendarioHTML += `</tr></table>`;
    return calendarioHTML;
  } catch (erro) {
    console.error('Erro ao gerar o calendario:', erro);
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

    return segundoDomingo.getDate();

  } else if (mes === 8) { // Agosto
    const primeiroDeAgosto = new Date(ano, mes - 1, 1);
    const diaDaSemana = primeiroDeAgosto.getDay();
    const diasAteSegundoDomingo = 14 - diaDaSemana;
    const segundoDomingo = new Date(ano, mes - 1, diasAteSegundoDomingo + 1);

    return segundoDomingo.getDate();
    
  }
}

/* estações */
async function obterEstacoes(ano) {
  return fetch('./data/estacoes_ano.json')
    .then(response => response.json())
    .then(data => {
      const estacoesAno = data[ano];
      const vetorEstacoes = [];

      if (estacoesAno) {
        // Iterar sobre as estações do ano
        for (const estacao in estacoesAno) {
          const dataEstacao = estacoesAno[estacao].data;
          const [dia, mesEstacao] = dataEstacao.split('/');
          const dataEstacaoObj = new Date(ano, mesEstacao - 1, dia);

          vetorEstacoes.push({
            estacao: estacao,
            dataInicio: dataEstacaoObj,
            horaInicio: estacoesAno[estacao].hora,
            img: estacoesAno[estacao].img
          });
        }

        return vetorEstacoes;
      } else {
        console.error('Ano não encontrado no arquivo JSON.');
        return null;
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o arquivo JSON:', error);
      return null;
    });
}

/* fases da lua */
async function obterFasesDaLua(ano, mes) {
  // Construa o caminho relativo para o arquivo JSON
  const jsonPath = './data/fases_da_lua.json';

  // Faça uma requisição HTTP para carregar o JSON e retorne a promise
  return fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      // Verifique se o ano e mês estão presentes no JSON
      if (data[ano] && data[ano][mes]) {
        return data[ano][mes];
      } else {
        console.error("Ano ou mês não encontrados no JSON.");
        return [];
      }
    })
    .catch(error => {
      console.error("Erro ao carregar o arquivo JSON:", error);
      return [];
    });
}