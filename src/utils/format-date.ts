type MonthProp = {
  year: number;
  month: number;
};

type DateProp = {
  year: number;
  month: number;
  day: number;
};

const formatMonths = (dateInput: Date): MonthProp => {
  return {
    year: dateInput.getFullYear(),
    month: dateInput.getMonth() + 1,
  };
};

const styleMonths = ({ year, month }: MonthProp): string => {
  return `${year}년 ${month}월`;
};

const formatDate = (dateInput: Date): DateProp => {
  const dateString = dateInput.toLocaleString();
  const components: string[] = dateString.split('. ');

  const { year, month, day }: DateProp = {
    year: +components[0],
    month: +components[1],
    day: +components[2],
  };
  return { year, month, day };
};

const styleDate = ({ year, month, day }: DateProp): string => {
  return `${year}년 ${month}월 ${day}일`;
};

export { formatMonths, styleMonths, formatDate, styleDate };
