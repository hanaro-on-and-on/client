//근무지 수동 추가
type ManualWorkPlaceAdditionRequest = {
  customWorkPlaceNm: string; //근무지명
  payPerHour: long; //시급
};

type ManualWorkPlaceAdditionResponse = {
  customWorkPlaceId: number;
};

//서명 요청
type ConfirmWorks = {
  employeeId: number | null;

  workPlaceName: string;
  colorCodeType: string;
  ownerName: string;
};

type ConfirmReqResponse = {
  workPlacesInvitaionsGetResponseList: ConfirmWorks[];
};

//급여내역 월별 조회
type EmployeeSalaryGetResponseList = {
  isConnected: boolean;
  id: number | null;
  isQuit: boolean;
  workPlaceName: string;
  workPlaceColor: string;
  payment: number;
};

type MonthlyPayment = {
  year: number;
  month: number;
  totalPayment: number;
  employeeSalaryGetResponseList: EmployeeSalaryGetResponseList[];
};

//서류 조회
type EmploymentContractListGetResponse = {
  employmentContractId: number; // 근로계약서 id
  workPlaceNm: string;
  employmentContractCreatedAt: string;
  colorTypeCd: string;
};

//대표 계좌 등록
type RegisterEmployeeAccount = {
  employeeNm: string;
  accountNumber: string;
};

type RegisterEmployeeAccountResponse = {
  employeeId: number;
};

//대표 계좌 수정
type EmployeeAccountUpdate = {
  accountNumber: string;
};

//급여명세서 월별 조회
type EmployeePayStubGetResponse = {
  payStubId: number;
  wokrPlaceEmployeeId: number;
  year: number;
  month: number;
  status: string; // 급여 지급 상태,
  salary: number; // 최종 급여
  totalPay: number; // 지급 합계
  totalTaxPay: number; // 공제 합계
  paymentDay: number;
  payPerHour: number;
  basicHour: number;
  basicPay: number; // 근무 수당, 시급 * basicHour
  overHour: number;
  overPay: number; // 연장 수당
  weeklyHolidayTime: number;
  weeklyHolidayPay: number; // 주휴 수당
  taxRate: number;
  taxPay: number;
};
