export function getTimestampOfLastDayOfCurrentMonth() {
  const nextMonthIndex = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  return new Date(currentYear, nextMonthIndex, 0).setHours(23, 59, 59, 999);
}
