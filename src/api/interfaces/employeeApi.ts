interface employeeApi {
  manualWorkPlaceAddition(
    req: ManualWorkPlaceAdditionRequest
  ): Promise<ManualWorkPlaceAdditionResponse>;

  getConfirmReq(): Promise<ConfirmReqResponse>;
  getMonthlyPayment(year: number, month: number): Promise<MonthlyPayment>;

  getPaperList(): Promise<EmploymentContractListGetResponse[]>;

  registerEmployeeAccount(
    prop: RegisterEmployeeAccount
  ): Promise<RegisterEmployeeAccountResponse>;
}

export default employeeApi;