export function calcularDataMaePai(mes, ano) {
    
    if (mes === 5) { // Maio
      // Calcula o Dia das Mães (segundo domingo de maio)
      const primeiroDeMaio = new Date(ano, mes - 1, 1);
      const diaDaSemana = primeiroDeMaio.getDay();
      const diasAtePrimeiroDomingo = 7 - diaDaSemana;
      const segundoDomingo = new Date(ano, mes - 1, 8 + diasAtePrimeiroDomingo);
  
      return `${segundoDomingo.getDate()}/${mes}/${ano}: Dia das Mães`;

    } else if (mes === 8) { // Agosto
      // Calcula o Dia dos Pais (segundo domingo de agosto)
      const primeiroDeAgosto = new Date(ano, mes - 1, 1);
      const diaDaSemana = primeiroDeAgosto.getDay();
      const diasAteSegundoDomingo = 14 - diaDaSemana;
  
      const segundoDomingo = new Date(ano, mes - 1, diasAteSegundoDomingo + 1);
  
      return `${segundoDomingo.getDate()}/${mes}/${ano}: Dia dos Pais`;

    }
  }  