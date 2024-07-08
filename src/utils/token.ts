import { getCookie, setCookie } from './cookie';

export const getToken = (): string => {
  return getCookie('x-access-token');
};

export const setToken = (token: string) => {
  setCookie('x-access-token', token);
};
