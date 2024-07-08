import { getCookie } from './cookie';

const getToken = (): string => {
  return getCookie('x-access-token');
};

export default getToken;
