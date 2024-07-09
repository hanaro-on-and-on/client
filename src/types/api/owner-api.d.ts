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
