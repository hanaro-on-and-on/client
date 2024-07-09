import { EmployeeContract } from '../../types/contract';

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
}
export default ownerApi;
