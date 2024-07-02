const generateMonthList = (): Date[] => {
  const today = new Date();
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push(date);
  }
  return months;
};

export default generateMonthList;
