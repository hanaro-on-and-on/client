export const getRandomNumber = (min: number, max: number) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1));
  return String(randomNumber).padStart(2, '0');
};
