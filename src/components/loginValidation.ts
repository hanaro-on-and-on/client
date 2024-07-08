export enum LogInValidationType {
  PW_NOT_FOUND = 'pw-not-found',
  SUCCESS = 'success',
}

const loginValidation = (pw: string) => {
  if (!pw) {
    return LogInValidationType.PW_NOT_FOUND;
  }

  return LogInValidationType.SUCCESS;
};

export default loginValidation;
