export const getTimeString = (
  dateString: string | Date | undefined
): string | undefined => {
  if (!dateString) {
    return undefined;
  }
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0'); // "09"
  const minutes = date.getMinutes().toString().padStart(2, '0'); // "00"
  return `${hours}:${minutes}`;
};
