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
    id: number,
    yearn: number,
    month: number
  ): Promise<EmployeePayStubGetResponse>;

  employeeGetContract(
    employmentContractId: number
  ): Promise<EmployeePaperGetResponse>;

  employeeSignature(payStubId: number): Promise<EmployeeSignatureResponse>;

  employeeGetAttendanceList(): Promise<EmployeeTodayAttendancesResponse>;

  employeeGetMyInfo(): Promise<MyInfo>;

  employeeGetWorkPlaceInfo(workPlaceEmployeeId: number): Promise<WorkPlaceInfo>;

  employeeGetWorkPlaceList(): Promise<EmployeeWorkPlaceList>;

  employeeGetAttendanceDetail(
    workPlaceId: number
  ): Promise<EmployeeAttendanceDetail>;

  employeeGetWorkTimeListConnected(
    workPlaceEmployeeId: number,
    year: number,
    month: number
  ): Promise<EmployeeWorkTimeListConnected>;

  employeeGetWorkTimeList(
    workPlaceEmployeeId: number,
    year: number,
    month: number
  ): Promise<EmployeeWorkTimeList>;
}

export default employeeApi;
