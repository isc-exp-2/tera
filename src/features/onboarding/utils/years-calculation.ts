export function yearsCalculation() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const startYear = currentYear - 4;
  const years: string[] = [];

  for (let y = currentYear; y >= startYear; y--) {
    if (y === currentYear && currentMonth < 4) continue;

    years.push(String(y));
  }

  return years;
}
