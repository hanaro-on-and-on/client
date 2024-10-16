export type CalendarDayType = {
  attendanceId: number;
  workPlaceEmployeeId: number;
  employeeName: string;
  attendanceType: string;
  payPerHour: number;
  startTime: Date;
  endTime: Date;
  restMinutes: number;
};

export type CalendarSalaryType = {
  workPlaceId: number;
  workPlaceName: string;
  workPlaceColor: string;
  days: CalendarDayType[];
};

export type DateWorkDetail = {
  workPlaceName: string;
  workPlaceColor: string;
  attendanceId: number;
  workPlaceEmployeeId: number;
  employeeName: string;
  attendanceType: string;
  payment: number;
  startTime: Date;
  endTime: Date;
  restMinute: number;
};

export type Attendance = {
  attendanceId?: number;
  workPlaceEmployeeId: number;
  payPerHour: number; // 시급
  startTime: Date; // 시작 시간
  endTime: Date; // 끝 시간
  restMinutes: number;
};
