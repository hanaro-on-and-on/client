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

  OwnerGetEmployeeAccountInfo(
    workPlaceEmployeeId: number
  ): Promise<OwnerGetEmployeeAccountInfo>;

  OwnerConfirmPayment(
    payStubId: number,
    request: OwnerConfirmPayment
  ): Promise<OwnerConfirmPaymentResponse>;
}
export default ownerApi;
