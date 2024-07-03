export const isCurrentDate = (date: Date, year: number, month: number) => {
  return date.getFullYear() === year && date.getMonth() + 1 === month;
};
