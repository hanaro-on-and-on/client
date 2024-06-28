export type CalendarDayType = {
  attendanceId: number;
  workPlaceEmployeeId: number;
  employeeName: string;
  attendanceType: string;
  payPerHour: number;
  startTime: string;
  endTime: string;
};

export type CalendarSalaryType = {
  workPlace: number;
  workPlaceName: string;
  workPlaceColor: string;
  day: CalendarDayType[];
};
