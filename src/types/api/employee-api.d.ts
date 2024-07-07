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
  id: number | null;
  isConnected: boolean;
  isQuit: boolean;
  payStubId: number | null;
  workPlaceName: string;
  workPlaceColorCode: string;
  payment: number;
};

type MonthlyPayment = {
  year: number;
  month: number;
  totalPayment: number;
  list: EmployeeSalaryGetResponseList[];
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

//단일 근로 계약서 조회
type WorkTimes = {
  workDayOfWeek: string;
  workStartTime: string;
  workEndTime: string;
  restStartTime: string;
  restEndTime: string;
};

type EmployeePaperGetResponse = {
  employmentContractId: number; // 근로계약서 id
  workPlaceName: string;
  workStartDate: Date;
  workSite: string;
  workDetail: string;
  workTimes: WorkTimes[];
  payPerHour: number;
  paymentDay: number;
  employeeNm: string;
  employeeAddress: string;
  employeePhone: string;
  restDayOfWeek: number;
  bonusAmount: number;
  otherAllowancesAmount: number;
  otherAllowancesName: string;
  overTimeRate: number;
};

//급여 명세서 전자 서명
type EmployeeSignatureResponse = {
  status: number;
};

//오늘 출근 목록
type Notice = {
  notificationId: number;
  title: string;
  content: string;
  date: Date;
};
type AttendanceWorkTime = {
  workDayOfWeek: string;
  workStartTime: string;
  workEndTime: string;
};

type AttendanceTodayWork = {
  colorTypeCd: string;
  endTime: Date;
  workPlaceEmployeeId: number;
  workPlaceName: string;
  startTime: Date;
  realStartTime: Date;
  realEndTime: Date;
  notice: Notice[]; // <- 차이점! 밑의 totalWorks 에는 없음
};

type AttendanceWork = {
  workPlaceEmployeeId: number;
  workPlaceName: string;
  colorTypeCd: string;
  workTime: AttendanceWorkTime[];
};

type EmployeeTodayAttendancesResponse = {
  works: AttendanceTodayWork[];
  totalWorks: AttendanceWork[];
};

//대표 계좌 조회 (내 정보 조회)
type MyInfo = {
  accountNumber: string;
  phoneNumber: string; //전화번호
  username: string; //성명
};

//근무지 간략 조회
type WorkPlaceInfo = {
  workPlaceEmployeeId: long;
  workPlaceNm: string;
  colorTypeCd: string;
  workStartDate: string;
};

//근무지 목록 조회
type invitatedWorkPlace = {
  isQuit: null | boolean;
  employmentContractId: number;
  customWorkPlaceId: number | null;
  workPlaceName: string;
  colorCodeType: string;
  ownerName: string;
};

type connectedWorkPlace = {
  isQuit: boolean | null;
  employmentContractId: null | number;
  customWorkPlaceId: null | number;
  workPlaceName: string;
  colorCodeType: string;
  ownerName: string;
};

type customWorkPlace = {
  isQuit: boolean | null;
  employmentContractId: null | number;
  customWorkPlaceId: 1;
  workPlaceName: string;
  colorCodeType: string;
  ownerName: null;
};

type EmployeeWorkPlaceList = {
  invitatedWorkPlaceList: invitatedWorkPlace[];
  connectedWorkPlaceList: connectedWorkPlace[];
  customWorkPlaceList: customWorkPlace[];
};

//출퇴근 상세 조회
type AttendanceWorkTime = {
  workDayOfWeek: string;
  startTime: Date;
  endTime: Date;
  date: Date;
};
type EmployeeAttendanceDetail = {
  workPlaceEmployeeId: number;
  workPlaceName: string;
  colorTypeCode: string;
  location: { lat: number; lng: number };
  workTime: AttendanceWorkTime[];
  notice: Notice[];
};

//근무 목록 - 연결O
type WorkListWorkTime = {
  endTime: Date | string;
  startTime: Date | string;
  workDay: string;
};

//근무 목록
type EmployeeWorkTimeList = {
  year: number;
  month: number;
  workPlaceId: number;
  workPlaceNm: string;
  workPlaceColor: string;
  totalPayPerMonth: number;
  works: WorkListWorkTime[];
};

//수동 근무 삭제
type EmployeeDeleteWorkPlaceResponse = {
  success: boolean;
};
