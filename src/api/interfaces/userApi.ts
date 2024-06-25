interface userApi {
  login: () => Promise<BaseResponse<string>>;
}

export default userApi;
