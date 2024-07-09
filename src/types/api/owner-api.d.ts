type CalendarData = {
  currentPayment: number;
  totalPayment: number;
  workPlaceList: WorkPlaceList[];
};

type WorkPlaceList = {
  // workPlaceId: number;
  workPlaceName: string;
  workPlaceColorCode: string;
  attendDate: string;
  employeeSize: number;
  employeeList: EmployeeAttendance[];
};

type EmployeeAttendance = {
  attendanceId: number;
  workPlaceEmployeeId: number;
  employeeName: string;
  startTime: Date;
  workStartDate: Date;
  endTime: Date;
  restMinute: number;
  payment: number;
};

// ----------------
type MyPlacesResponse = {
  year: number;
  month: number;
  totalPayment: number;
  workPlaceList: MyPlaceWorkPlaceList[];
};

type MyPlaceWorkPlaceList = {
  workPlaceId: number;
  workPlaceName: string;
  workPlaceColor: string;
  payment: number;
  employeeList: MyPlaceEmployeeList[];
};
type MyPlaceEmployeeList = {
  workPlaceEmployeeId: number;
  employeeName: string;
  workStartDate: string;
  payment: number;
};
// ---------
type MyPlaceDetailResponse = {
  workPlaceId: number;
  workPlaceName: string;
  workPlaceColor: string;
  payment: number;
  employeeList: MyPlaceDetailEmployeeList[];
};
type MyPlaceDetailEmployeeList = {
  workPlaceEmployeeId: number;
  employeeName: string;
  workStartDate: string;
  payment: number;
};
// ---------

type GetEmployeeList = {
  employeeList: Employee[];
};
type Employee = {
  workPlaceEmployeeId: number;
  workPlaceName: string;
  colorTypeCode: string;
  employeeName: string;
};

// -----------
type NotificationsResponse = {
  list: NotificationsResponseNotice[];
};
type NotificationsResponseNotice = {
  notificationId: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

//사장님 - 대표계좌 등록
type OwnerAddMainAccountRequest = {
  ownerNm: string;
  accountNumber: string;
};

type OwnerAddMainAccountResponse = {
  ownerId: number;
};

// 사장님 - 근로자 등록 응답
type RegisterEmployeeResponse = {
  employmentContractId: number;
  workPlaceEmployeeId: number;
};

// 사장님 - 근무 수동 추가 요청, 응답
type RegisterAttendanceManualRequest = {
  workPlaceEmployeeId: number;
  payPerHour: number;
  startTime: string;
  endTime: string;
  restMinute: number;
};
type RegisterAttendanceManualResponse = {
  attendanceId: number;
};

// 사장님 - 공지 추가
type RegisterNoticeRequest = {
  title: string;
  content: string;
};
type RegisterNoticeResponse = { notificationId: number };

// 사장님 - 사업자등록번호 조회
type ValidBusinessNumberRequest = {
  businessRegistrationNumber: string;
  openDate: string;
  businessName: string;
  businessAddress: string;
};
type ValidBusinessNumberResponse = {
  valid: boolean;
  b_nm: string;
  b_stt: string;
  b_adr: string;
};

// 사장님 - 사업장 등록
type RegisterWorkPlaceResponse = {
  workPlaceId: number;
};

// 사장님 - 공지사항 삭제
type DeleteNoticeResponse = {
  success: boolean;
};
//알바생 정보 조회 ( 급여명세서 정보 조회 )
type OwnerGetEmployeeInfo = {
  workPlaceEmployeeId: number;
  workPlaceName: string;
  colorTypeCode: string;
  employeeName: string;
  workStartDate: string;
};

//사장님 - 알바생 계좌 조회
type OwnerGetEmployeeAccountInfo = {
  ownerNm: string;
  ownerAccountNumber: string;
  employeeNm: string;
  employeeAccountNumber: string;
};

//사장님 - 간편 지급 예약
type OwnerConfirmPayment = {
  senderAccountNumber: string;
  senderNm: string;
  receiverAccountNumber: string;
  receiverNm: string;
  amount: number;
};

type OwnerConfirmPaymentResponse = {
  salaryTransferReserveId: number;
};

// 사장님 - 근무 세부 조회
type AttendanceResponse = {
  attendanceId: number;
  workPlaceEmployeeId: number;
  payPerHour: number;
  startTime: Date;
  endTime: Date;
  restMinute: number;
};

// 사장님 - 근무 수정
type UpdateAttendanceRequest = {
  workPlaceEmployeeId: number;
  payPerHour: number; // 시급
  startTime: string; // 시작 시간
  endTime: string; // 끝 시간
  restMinute: number;
};
type UpdateAttendanceResponse = {
  attendanceId: number;
};
