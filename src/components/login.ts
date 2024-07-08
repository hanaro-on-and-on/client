import { AxiosError } from 'axios';
import ApiClient from '../api/apiClient';
import loginValidation, { LogInValidationType } from './loginValidation';
import { setToken } from '../utils/token';

export enum ROLE {
  EMPLOYEE = 'employee',
  OWNER = 'owner',
}

export type LoginReturnType = {
  role: ROLE | null;
  isSuccess: boolean;
};
const login = async (
  pw: string,
  modalAction?: (prop: string) => void
): Promise<LoginReturnType> => {
  if (loginValidation(pw) === LogInValidationType.PW_NOT_FOUND) {
    if (modalAction) modalAction('비밀번호를 입력해주세요');
    return { role: null, isSuccess: false };
  }

  try {
    const response = await ApiClient.getInstance().login(pw);
    setToken(response.accessToken);
    return {
      role: response.employeeId ? ROLE.EMPLOYEE : ROLE.OWNER,
      isSuccess: true,
    };
  } catch (err: any) {
    const error = err as AxiosError;
    if (error.response && Number(error.response.status) / 100 !== 2) {
      if (modalAction) modalAction('비밀번호가 틀렸습니다');
    }
    return { role: null, isSuccess: false };
  }
};

export default login;
