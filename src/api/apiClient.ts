import axios from 'axios';
import employeeApi from './interfaces/employeeApi';

class ApiClient implements employeeApi {
  //singleton pattern
  private static instance: ApiClient;
  private axiosInstance;

  constructor() {
    this.axiosInstance = ApiClient.createAxiosInstance();
  }

  //=========================
  // 메소드

  //알바생 - 근무지 수동 추가
  public async manualWorkPlaceAddition(req: ManualWorkPlaceAdditionRequest) {
    const response = await this.axiosInstance.request({
      method: 'post',
      url: '/employee/work-places/custom',
      data: req,
    });

    return response.data;
  }

  //알바생 - 서명 요청 목록
  public async getConfirmReq() {
    const response = await this.axiosInstance.request({
      method: 'get',
      url: 'employee/work-places/invitation',
    });

    return response.data;
  }

  //알바생 - 월별 급여 내역 조회
  public async getMonthlyPayment(
    year: number,
    month: number
  ): Promise<MonthlyPayment> {
    const response: BaseResponse<MonthlyPayment> =
      await this.axiosInstance.request({
        method: 'get',
        url: `employee/salaries?year=${year}&month=${month}`,
      });

    return response.data;
  }

  //알바생 - 서류 목록
  public async getPaperList(): Promise<EmploymentContractListGetResponse[]> {
    const response: BaseResponse<EmploymentContractListGetResponse[]> =
      await this.axiosInstance.request({
        method: 'get',
        url: 'papers',
      });

    return response.data;
  }

  //알바생 - 단일 근로 계약서 조회
  public async employeeGetContract(
    employmentContractId: number
  ): Promise<EmployeePaperGetResponse> {
    const response = await this.axiosInstance.request({
      method: 'get',
      url: `papers/employment-contracts/${employmentContractId}`,
    });

    return response.data;
  }

  //알바생 - 대표 계좌 등록
  public async registerEmployeeAccount({
    accountNumber,
    employeeNm,
  }: RegisterEmployeeAccount): Promise<RegisterEmployeeAccountResponse> {
    const dat: RegisterEmployeeAccount = {
      accountNumber,
      employeeNm,
    };

    const response: BaseResponse<RegisterEmployeeAccountResponse> =
      await this.axiosInstance.request({
        method: 'post',
        url: 'employee/accounts',
        data: dat,
      });

    return response.data;
  }

  //알바생 - 대표 계좌 수정
  public async employeeUpdateAccount(
    prop: EmployeeAccountUpdate
  ): Promise<any> {
    const dat: EmployeeAccountUpdate = {
      accountNumber: prop.accountNumber,
    };
    const response = await this.axiosInstance.request({
      method: 'put',
      url: 'employee/accounts',
      data: dat,
    });

    return response.data;
  }

  //알바생 - 월별 급여 명세서 조회
  public async employeeGetPayStub(
    workPlaceEmployeeId: number,
    year: number,
    month: number
  ): Promise<EmployeePayStubGetResponse> {
    const response: BaseResponse<EmployeePayStubGetResponse> =
      await this.axiosInstance.request({
        method: 'get',
        url: `papers/${workPlaceEmployeeId}/pay-stubs?year=${year}&month=${month}`,
      });

    return response.data;
  }

  //알바생 - 급여 명세서 서명
  public async employeeSignature(
    payStubId: number
  ): Promise<EmployeeSignatureResponse> {
    const response: BaseResponse<EmployeeSignatureResponse> =
      await this.axiosInstance.request({
        method: 'get',
        url: `papers/pay-stubs/${payStubId}/e-sign`,
      });

    return response.data;
  }

  //알바생 - 출결 목록 조회
  public async employeeGetAttendanceList(): Promise<EmployeeTodayAttendancesResponse> {
    const response: BaseResponse<EmployeeTodayAttendancesResponse> =
      await this.axiosInstance.request({
        method: 'get',
        url: 'attendances/today',
      });

    return response.data;
  }

  //알바생 - 대표 계좌 조회
  public async employeeGetMyInfo(): Promise<MyInfo> {
    const response: BaseResponse<MyInfo> = await this.axiosInstance.request({
      method: 'get',
      url: 'employee/accounts',
    });

    return response.data;
  }

  //알바생 - 매장명 간략 조회
  public async employeeGetWorkPlaceInfo(
    workPlaceEmployeeId: number
  ): Promise<WorkPlaceInfo> {
    const response: BaseResponse<WorkPlaceInfo> =
      await this.axiosInstance.request({
        method: 'get',
        url: `papers/${workPlaceEmployeeId}`,
      });
    return response.data;
  }

  //==========================
  // 생성 메소드
  private static createAxiosInstance() {
    const newInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 100000,
    });

    newInstance.interceptors.request.use((config) => {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] =
        `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`;
      return config;
    });

    return newInstance;
  }

  static getInstance(): ApiClient {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }
}

export default ApiClient;
