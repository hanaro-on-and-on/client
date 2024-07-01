interface employeeApi {
  manualWorkPlaceAddition(
    req: ManualWorkPlaceAdditionRequest
  ): Promise<BaseResponse<ManualWorkPlaceAdditionResponse>>;

  getConfirmReq(): Promise<BaseResponse<ConfirmReqResponse>>;
  getMonthlyPayment(
    year: number,
    month: number
  ): Promise<BaseResponse<MonthlyPayment>>;
}

export default employeeApi;
