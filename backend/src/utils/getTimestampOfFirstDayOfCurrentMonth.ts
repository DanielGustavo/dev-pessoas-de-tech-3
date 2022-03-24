export function getTimestampOfFirstDayOfCurrentMonth() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  return new Date(`${currentYear}-${currentMonth}-01Z`).getTime();
}
