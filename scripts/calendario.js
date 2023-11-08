// calendario.js

export function gerarCalendario(ano, mes) {
  const diasNoMes = new Date(ano, mes, 0).getDate();
  const primeiraSemana = new Date(ano, mes - 1, 1).getDay();
  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  let calendarioHTML = `<table class="table table-borderless"><tr>`;
  
  // Cabeçalho do calendário com os nomes dos dias da semana
  for (let diaSemana = 0; diaSemana < 7; diaSemana++) {
    calendarioHTML += `<th>${diasDaSemana[diaSemana]}</th>`;
  }
  
  calendarioHTML += `</tr><tr>`;

  // Preencha o calendário com os dias do mês
  for (let i = 0; i < primeiraSemana; i++) {
    calendarioHTML += `<td></td>`;
  }
  for (let dia = 1; dia <= diasNoMes; dia++) {
    calendarioHTML += `<td>${dia}</td>`;
    if ((dia + primeiraSemana) % 7 === 0) {
      calendarioHTML += `</tr><tr>`;
    }
  }
  
  calendarioHTML += `</tr></table>`;
  return calendarioHTML;
}