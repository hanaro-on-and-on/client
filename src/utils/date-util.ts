import { DayOfWeek, DayOfWeekShort } from '../types/contract';

export const parseYYYMMDD = (dateString: string): Date => {
  // 문자열에서 연도, 월, 일을 추출합니다.
  const year = parseInt(dateString.substring(0, 4), 10); // 앞의 4자리: 연도
  const month = parseInt(dateString.substring(4, 6), 10) - 1; // 중간 2자리: 월 (0부터 시작하므로 -1)
  const day = parseInt(dateString.substring(6, 8), 10); // 마지막 2자리: 일

  // Date 객체를 생성합니다.
  return new Date(year, month, day);
};

export const addSuffixDayOfWeek = (day: DayOfWeekShort) => {
  return `${day}요일` as DayOfWeek;
};

export const convertToISOFormat = (dateString: string | Date) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
