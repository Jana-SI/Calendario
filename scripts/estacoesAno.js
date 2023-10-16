export function getSeason(month) {
    const seasons = ["Verão", "Outono", "Inverno", "Primavera"];
    const seasonStartDates = [new Date(0, 0, 1), new Date(0, 2, 1), new Date(0, 5, 1), new Date(0, 8, 1)];
    const currentDate = new Date(0, month - 1, 1); // Ajuste para o seletor que começa em 1.

    for (let i = 0; i < seasonStartDates.length; i++) {
        if (currentDate >= seasonStartDates[i] && currentDate < seasonStartDates[(i + 1) % 4]) {
            const nextSeason = (i + 1) % 4;
            const nextSeasonDate = seasonStartDates[nextSeason];
            const daysUntilNextSeason = Math.ceil((nextSeasonDate - currentDate) / (1000 * 60 * 60 * 24));
            return `${seasons[i]} - Falta ${daysUntilNextSeason} dias para ${seasons[nextSeason]} (em ${nextSeasonDate.getDate()}/${nextSeasonDate.getMonth() + 1})`;
        }
    }

    return "Estação indefinida";
}