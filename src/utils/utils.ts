export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export function getFirstDayOfMonth(date: Date, _months) {
  return new Date(
    `1 ${_months.long[date.getMonth()]}, ${date.getFullYear()}`
  ).getDay();
}

export function getNumberOfDaysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return new Date(year, month, 0).getDate();
}

export const print =console.log;