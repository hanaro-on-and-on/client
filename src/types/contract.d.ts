export type EmployeeContract = {
  workPlaceNm: string;
  employeeNm: string;
  employeeAddress: string;
  employeePhone: string;
  workStartDate: Date;
  workEndDate: Date;
  workSite: string;
  workDetail: string;
  workTimes: WorkTime[];
  payPerHour: number;
  paymentDay: number; // 1 ~ 28
  restDayOfWeek: string;
  bonusAmount: number;
  otherAllowancesAmount: number;
  otherAllowancesName: string;
  overtimeRate: number;
};

export type DayOfWeek =
  | '월요일'
  | '화요일'
  | '수요일'
  | '목요일'
  | '금요일'
  | '토요일'
  | '일요일';

export type WorkTime = {
  workDayOfWeek: DayOfWeek;
  workStartTime: string;
  workEndTime: string;
  restStartTime: string;
  restEndTime: string;
};

export type FirstInfo = {
  employeeNm: string;
  employeeAddress: string;
  employeePhone: string;
};

export type SecondInfo = {
  workStartDate: Date;
  workEndDate: Date;
  workSite: string;
  workDetail: string;
  workTimes: WorkTime[];
};

export type ThirdInfo = {
  payPerHour: number;
  paymentDay: number;
  restDayOfWeek: DayOfWeek | undefined;
  bonusAmount: number;
  otherAllowancesAmount: number;
  otherAllowancesName: string | undefined;
  overtimeRate: number;
};
