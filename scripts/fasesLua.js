export function exibirFasesDaLua(ano, mes) {
    fetch('/data/fases_da_lua.json')
      .then(response => response.json())
      .then(data => {
        if (data[ano] && data[ano][mes]) {
          const fasesDoMes = data[ano][mes];
          const resultElement = document.getElementById('fasesLua');
          
          fasesDoMes.forEach(fase => {
            const paragraph = document.createElement('p');
            paragraph.textContent = `${fase.date}: ${fase.phase}`;
            resultElement.appendChild(paragraph);
          });
        } else {
          console.log("Dados não encontrados para o ano e mês fornecidos.");
        }
      })
      .catch(error => console.error(error));
  }