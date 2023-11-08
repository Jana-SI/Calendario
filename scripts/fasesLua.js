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

                const ul = document.createElement("ul");
                ul.className = "list-group list-group-horizontal"; // Adicione a classe do Bootstrap
                elementoHtml.appendChild(ul);

                fases.forEach((fase) => {
                    const data = fase.data.split("-")[2];
                    const descricao = fase.fase;
                    const li = document.createElement("li");
                    li.className = "list-group-item"; // Adicione a classe do Bootstrap
                    li.innerHTML = `${data}<br>${descricao}`;
                    ul.appendChild(li);
                });

            } else {
                console.error("Ano ou mês não encontrados no JSON.");
            }
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
        });
}