import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { CalendarSalaryType, DateWorkDetail } from '../types/calendar';

const mockData = [
  {
    workPlaceId: 1,
    workPlaceName: '롯데리아',
    workPlaceColor: '01',
    days: [
      {
        attendanceId: 2453,
        workPlaceEmployeeId: 10,
        employeeName: '이신광',
        attendanceType: 'real', // expect, real
        payPerHour: 10000,
        startTime: new Date('2024-06-26T10:30:00'),
        endTime: new Date('2024-06-26T14:30:00'),
      },
      {
        attendanceId: 2460,
        workPlaceEmployeeId: 10,
        employeeName: '이신광',
        attendanceType: 'expect', // expect, real
        payPerHour: 10000,
        startTime: new Date('2024-06-30T10:30:00'),
        endTime: new Date('2024-06-30T18:30:00'),
      },
      {
        attendanceId: 2461,
        workPlaceEmployeeId: 12,
        employeeName: '이서하',
        attendanceType: 'expect', // expect, real
        payPerHour: 12000,
        startTime: new Date('2024-06-30T08:30:00'),
        endTime: new Date('2024-06-30T18:30:00'),
      },
      {
        attendanceId: 2991,
        workPlaceEmployeeId: 12,
        employeeName: '이서하',
        attendanceType: 'real', // expect, real
        payPerHour: 9910,
        startTime: new Date('2024-06-28T09:30:00'),
        endTime: new Date('2024-06-28T18:30:00'),
      },
    ],
  },
  {
    workPlaceId: 2,
    workPlaceName: '버거킹',
    workPlaceColor: '02',
    days: [
      {
        attendanceId: 1999,
        workPlaceEmployeeId: 15,
        employeeName: '정연주',
        attendanceType: 'real', // expect, real
        payPerHour: 10000,
        startTime: new Date('2024-06-26T10:30:00'),
        endTime: new Date('2024-06-26T14:30:00'),
      },
      {
        attendanceId: 2464,
        workPlaceEmployeeId: 18,
        employeeName: '최은진',
        attendanceType: 'expect', // expect, real
        payPerHour: 12000,
        startTime: new Date('2024-06-29T09:30:00'),
        endTime: new Date('2024-06-29T18:30:00'),
      },
      {
        attendanceId: 2479,
        workPlaceEmployeeId: 18,
        employeeName: '최은진',
        attendanceType: 'expect', // expect, real
        payPerHour: 12000,
        startTime: new Date('2024-06-30T09:30:00'),
        endTime: new Date('2024-06-30T18:30:00'),
      },
    ],
  },
];

type CalendarDataContextProps = {
  calendarData: CalendarSalaryType[];
  getFilteredData: (date: Date) => DateWorkDetail[];
};

const CalendarDataContext = createContext<CalendarDataContextProps>([]);

export const CalendarDataProvider = ({ children }: PropsWithChildren) => {
  const [calendarData, setCalendarData] = useState(mockData);

  const getFilteredData = (date: Date) => {
    const filteredData: DateWorkDetail[] = [];
    calendarData.forEach((data) => {
      data.days.forEach((day) => {
        if (new Date(day.startTime).toDateString() === date.toDateString()) {
          filteredData.push({
            ...day,
            workPlaceName: data.workPlaceName,
            workPlaceColor: data.workPlaceColor,
          });
        }
      });
    });
    return filteredData;
  };

  return (
    <CalendarDataContext.Provider value={{ calendarData, getFilteredData }}>
      {children}
    </CalendarDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendarData = () => useContext(CalendarDataContext);
