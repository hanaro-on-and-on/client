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

  employeeUpdateAccount(prop: EmployeeAccountUpdate): Promise<any>;

  employeeGetPayStub(
    id: string,
    yearn: number,
    month: number
  ): Promise<EmployeePayStubGetResponse>;

  employeeSignature(payStubId: number): Promise<EmployeeSignatureResponse>;
}

export default employeeApi;
