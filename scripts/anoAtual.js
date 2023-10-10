const anoAtualElement = document.getElementById("anoAtual");

    // Obtenha o ano atual
    const anoAtual = new Date().getFullYear();

    // Atualize o conteúdo do <span> com o ano atual
    anoAtualElement.textContent = anoAtual;