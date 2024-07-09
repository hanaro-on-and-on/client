import { EmployeeContract, Place } from '../../types/contract';

interface ownerApi {
  getCalendarData(year: number, month: number): Promise<CalendarData>;

  getMyPlaces(year: number, month: number): Promise<MyPlacesResponse>;

  getMyPlaceDetail(
    id: number,
    year: number,
    month: number
  ): Promise<MyPlaceDetailResponse>;

  getMyEmployees(employeeStatus: string): Promise<GetEmployeeList>;

  getNotifications(id: number): Promise<NotificationsResponse>;

  // 사장님 - 근로자 추가
  registerEmployee(
    id: number,
    request: Partial<EmployeeContract>
  ): Promise<RegisterEmployeeResponse>;

  // 사장님 - 근로 수동 추가
  registerAttendance(
    request: RegisterAttendanceManualRequest
  ): Promise<RegisterAttendanceManualResponse>;

  // 사장님 - 공지 추가
  registerNotice(
    id: number,
    request: RegisterNoticeRequest
  ): Promise<RegisterNoticeResponse>;

  // 사장님 - 사업자등록번호 조회
  validBusinessNumber(
    request: ValidBusinessNumberRequest
  ): Promise<ValidBusinessNumberResponse>;

  // 사장님 - 사업장 등록
  registerWorkPlace(request: Place): Promise<RegisterWorkPlaceResponse>;

  // 사장님 - 알림 삭제
  deleteNotice(workPlaceId: number, id: number): Promise<DeleteNoticeResponse>;

  OwnerGetEmployeeAccountInfo(
    workPlaceEmployeeId: number
  ): Promise<OwnerGetEmployeeAccountInfo>;

  OwnerConfirmPayment(
    payStubId: number,
    request: OwnerConfirmPayment
  ): Promise<OwnerConfirmPaymentResponse>;

  // 사장님 - 근무 세부 조회
  getAttendance(id: number): Promise<AttendanceResponse>;
  // 사장님 - 근무 수정
  updateAttendance(
    id: number,
    request: UpdateAttendanceRequest
  ): Promise<UpdateAttendanceResponse>;
}
export default ownerApi;
