export const convertAccountNum = (accountNum: string | undefined) => {
  if (!accountNum) return '';
  if (accountNum.length < 10) return '';
  const first = accountNum.substring(0, 4);
  const second = accountNum.substring(4, 10);
  const third = accountNum.substring(10);

  return `${first}-${second}-${third}`;
};
