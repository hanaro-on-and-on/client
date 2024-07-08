const getTimeGap = (start: Date | string, end: Date | string): number => {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return diff / (1000 * 60);
};

export default getTimeGap;
