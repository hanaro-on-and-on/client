interface userApi {
  login: (pw: string) => Promise<LoginResponse>;

  userGetAccountList(): Promise<AccountList[]>;
}

export default userApi;
