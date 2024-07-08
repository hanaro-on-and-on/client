interface userApi {
  login: (pw: string) => Promise<LoginResponse>;
}

export default userApi;
