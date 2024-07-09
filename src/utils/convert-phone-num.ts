export const convertPhoneNum = (phoneNumber: string | undefined) => {
  if (!phoneNumber) return '';
  const first = phoneNumber.substring(0, 3);
  const second = phoneNumber.substring(3, 7);
  const third = phoneNumber.substring(7);

  return `${first}-${second}-${third}`;
};
