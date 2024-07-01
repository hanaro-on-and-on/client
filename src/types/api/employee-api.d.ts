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
