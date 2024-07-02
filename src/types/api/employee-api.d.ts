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
