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
export type DayOfWeekShort = '월' | '화' | '수' | '목' | '금' | '토' | '일';

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

// 사업장 등록 관련 ------
export type Place = {
  workPlaceNm: string;
  address: string;
  businessRegistrationNumber: string;
  openingDate: string;
  workPlaceType: string;
  colorTypeCode: string;
  location: GeoPoint;
};
export type GeoPoint = {
  lng: number;
  lat: number;
};
export type PlaceFirstInfo = {
  workPlaceNm: string;
  address: string;
  businessRegistrationNumber: string;
  openingDate: string;
  workPlaceType: string;
  colorTypeCode: string;
};
