// Array de nomes de meses
const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  // Seleciona o elemento select
  const selectMes = document.getElementById('mes');
  
  // Popula o seletor com os meses
  for (let i = 0; i < meses.length; i++) {
    const option = document.createElement('option');
    option.value = i + 1; // Valor do mês (1 a 12)
    option.text = meses[i]; // Nome do mês
    selectMes.appendChild(option);
  }  