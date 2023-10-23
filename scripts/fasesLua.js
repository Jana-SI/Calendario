export function exibirFasesDaLua(ano, mes) {
  // Construa o caminho relativo para o arquivo JSON
  const jsonPath = './data/fases_da_lua.json';

  // Faça uma requisição HTTP para carregar o JSON
  fetch(jsonPath)
      .then(response => response.json())
      .then(data => {
          // Verifique se o ano e mês estão presentes no JSON
          if (data[ano] && data[ano][mes]) {
              const fases = data[ano][mes];

              // Restante do código permanece o mesmo
              const elementoHtml = document.getElementById("fasesDaLua");
              elementoHtml.innerHTML = "";

              fases.forEach((fase) => {
                  const data = fase.data.split("-")[2];
                  const descricao = fase.fase;
                  const paragrafo = document.createElement("p");
                  paragrafo.textContent = `${data} - ${descricao}`;
                  elementoHtml.appendChild(paragrafo);
              });
          } else {
              console.error("Ano ou mês não encontrados no JSON.");
          }
      })
      .catch(error => {
          console.error("Erro ao carregar o arquivo JSON:", error);
      });
}