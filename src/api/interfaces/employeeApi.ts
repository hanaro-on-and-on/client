interface employeeApi {
  manualWorkPlaceAddition(
    req: ManualWorkPlaceAdditionRequest
  ): Promise<BaseResponse<ManualWorkPlaceAdditionResponse>>;

  getConfirmReq(): Promise<BaseResponse<ConfirmReqResponse>>;
}

export default employeeApi;
