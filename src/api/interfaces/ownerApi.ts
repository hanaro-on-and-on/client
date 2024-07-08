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
}
export default ownerApi;
