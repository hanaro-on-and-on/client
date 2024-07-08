import axios from 'axios';
import employeeApi from './interfaces/employeeApi';
import ownerApi from './interfaces/ownerApi';
import userApi from './interfaces/userApi';
import { getToken } from '../utils/token';

class ApiClient implements employeeApi, userApi, ownerApi {
  //singleton pattern
  private static instance: ApiClient;
  private axiosInstance;

  constructor() {
    this.axiosInstance = ApiClient.createAxiosInstance();
  }

  //=========================
  // 메소드

  //회원 - 로그인
  public async login(pw: string): Promise<LoginResponse> {
    const dat: LoginRequest = { password: pw };
    const response: BaseResponse<LoginResponse> =
      await this.axiosInstance.request({
        method: 'post',
        url: 'users/login',
        data: dat,
      });

    return response.data;
  }

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

  //알바생 - 월별 급여 명세서 조회 연결O
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

  //알바생 - 월별 급여 명세서 조회 연결X
  public async employeeGetCustomPayStub(
    customWorkPlaceId: number,
    year: number,
    month: number
  ): Promise<EmployeePayStubGetResponse> {
    const response: BaseResponse<EmployeePayStubGetResponse> =
      await ApiClient.getInstance().axiosInstance.request({
        method: 'get',
        url: `papers/custom/${customWorkPlaceId}/pay-stubs?year=${year}&month=${month}`,
      });

    return response.data;
  }

  //알바생 - 급여 명세서 서명
  public async employeeSignature(
    payStubId: number
  ): Promise<EmployeeSignatureResponse> {
    const response: BaseResponse<EmployeeSignatureResponse> =
      await this.axiosInstance.request({
        method: 'post',
        url: `papers/pay-stubs/${payStubId}/e-sign`,
      });

    return response.data;
  }

  //알바생 - 근무지 연동 서명
  public async employeeContractSign(
    employmentContractId: number
  ): Promise<EmployeeContractSignRequest> {
    const response: BaseResponse<{ workPlaceEmployeeId: number }> =
      await this.axiosInstance.request({
        method: 'post',
        url: `papers/employment-contracts/${employmentContractId}/e-sign`,
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

  //알바생 - 매장명 간략 조회 연결X
  public async employeeGetCustomWorkPlaceInfo(
    customWorkPlaceId: number
  ): Promise<CustomWorkPlaceInfo> {
    const response: BaseResponse<CustomWorkPlaceInfo> =
      await this.axiosInstance.request({
        method: 'get',
        url: `papers/custom/${customWorkPlaceId}`,
      });

    return response.data;
  }

  //알바생 - 근무지 목록 조회
  public async employeeGetWorkPlaceList(): Promise<EmployeeWorkPlaceList> {
    const response: BaseResponse<EmployeeWorkPlaceList> =
      await this.axiosInstance.request({
        method: 'get',
        url: 'employee/work-places',
      });

    return response.data;
  }

  //알바생 - 출퇴근 상세
  public async employeeGetAttendanceDetail(
    workPlaceId: number
  ): Promise<EmployeeAttendanceDetail> {
    const response = await this.axiosInstance.request({
      method: 'get',
      url: `attendances/${workPlaceId}`,
    });

    return response.data;
  }

  //알바생 - 근무 목록 연결O
  public async employeeGetWorkTimeListConnected(
    workPlaceEmployeeId: number,
    year: number,
    month: number
  ): Promise<EmployeeWorkTimeList> {
    const response: BaseResponse<EmployeeWorkTimeList> =
      await this.axiosInstance.request({
        method: 'get',
        url: `papers/${workPlaceEmployeeId}/attendance?year=${year}&month=${month}`,
      });

    return response.data;
  }

  //알바생 - 근무 목록 연결x
  public async employeeGetWorkTimeList(
    workPlaceEmployeeId: number,
    year: number,
    month: number
  ): Promise<EmployeeWorkTimeList> {
    const response: BaseResponse<EmployeeCustomWorkTimeList> =
      await this.axiosInstance.request({
        method: 'get',
        url: `papers/custom/${workPlaceEmployeeId}/attendance?year=${year}&month=${month}`,
      });

    const converted: EmployeeWorkTimeList = {
      ...response.data,
      workPlaceId: response.data.PlaceId,
    };
    return converted;
  }

  //알바생 - 수동 근무지 삭제
  public async employeeDeleteCustomWorkPlace(
    customWorkPlaceId: number
  ): Promise<EmployeeDeleteWorkPlaceResponse> {
    const response: BaseResponse<EmployeeDeleteWorkPlaceResponse> =
      await this.axiosInstance.request({
        method: 'delete',
        url: `employee/work-places/${customWorkPlaceId}/custom`,
      });

    return response.data;
  }

  //알바생 - 출근 등록
  public async employeeCheckIn(
    workPlaceEmployeeId: EmployeeCheckInRequest
  ): Promise<EmployeeCheckInResponse> {
    const response: BaseResponse<EmployeeCheckInResponse> =
      await this.axiosInstance.request({
        method: 'post',
        url: 'attendances/check-in',
        data: workPlaceEmployeeId,
      });

    return response.data;
  }

  //알바생 - 퇴근 등록
  public async employeeCheckOut(
    workPlaceEmployeeId: EmployeeCheckOutRequest
  ): Promise<EmployeeCheckOutResponse> {
    const response: BaseResponse<EmployeeCheckOutResponse> =
      await this.axiosInstance.request({
        method: 'post',
        url: 'attendances/check-out',
        data: workPlaceEmployeeId,
      });

    return response.data;
  }

  //사장님 - 대표 계좌 등록
  public async ownerAddMainAccount(
    prop: OwnerAddMainAccountRequest
  ): Promise<OwnerAddMainAccountResponse> {
    const response: BaseResponse<OwnerAddMainAccountResponse> =
      await this.axiosInstance.request({
        method: 'post',
        url: 'owner/accounts',
        data: prop,
      });

    return response.data;
  }

  // 사장님 - 캘린더 데이터
  public async getCalendarData(
    year: number,
    month: number
  ): Promise<CalendarData> {
    const response: BaseResponse<CalendarData> =
      await this.axiosInstance.request({
        method: 'get',
        url: `owner/salaries/calendar?year=${year}&month=${month}`,
      });
    return response.data;
  }
  // 사장님 - 나의 사업장 전체 조회
  public async getMyPlaces(
    year: number,
    month: number
  ): Promise<MyPlacesResponse> {
    const respnose: BaseResponse<MyPlacesResponse> =
      await this.axiosInstance.request({
        method: 'get',
        url: `/owner/salaries?year=${year}&month=${month}`,
      });
    return respnose.data;
  }

  // 사장님 - 나의 사업장 디테일 조회
  public async getMyPlaceDetail(
    id: number,
    year: number,
    month: number
  ): Promise<MyPlaceDetailResponse> {
    const respnose: BaseResponse<MyPlaceDetailResponse> =
      await this.axiosInstance.request({
        method: 'get',
        url: `/owner/salaries/work-places/${id}?year=${year}&month=${month}`,
      });
    return respnose.data;
  }

  // 사장님 - 근무자 전체 조회
  public async getMyEmployees(
    employeeStatus: string
  ): Promise<GetEmployeeList> {
    const response: BaseResponse<GetEmployeeList> =
      await this.axiosInstance.request({
        method: 'get',
        url: `/owner/work-places/employees?employeeStatus=${employeeStatus}`,
      });
    return response.data;
  }

  // 사장님 - 공지 전체 조회
  public async getNotifications(id: number): Promise<NotificationsResponse> {
    const response: BaseResponse<NotificationsResponse> =
      await this.axiosInstance.request({
        method: 'get',
        url: `/owner/work-places/${id}/notifications`,
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
      const token: string = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] =
        `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`;
      // config.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
      return config;
    });

    // newInstance.interceptors.response.use(
    //   (response) => {
    //     if (response.status === 404) {
    //       console.log('404 페이지로 넘어가야 함!');
    //     }

    //     return response;
    //   },
    //   async (error) => {
    //     if (error.response?.status === 401) {
    //       // if (error.response.data === 'TOKEN_EXPIRED') await tokenRefresh();

    //       const accessToken = getToken();

    //       error.config.headers = {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${accessToken}`,
    //       };

    //       const response = await axios.request(error.config);
    //       return response;
    //     }
    //     return Promise.reject(error);
    //   }
    // );

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
