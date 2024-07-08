type BaseResponse<T> = {
  data: T;
};

type LoginRequest = {
  password: string;
};

type LoginResponse = {
  accessToken: string;
  ownerId: number;
  employeeId: number;
};
