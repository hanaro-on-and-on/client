import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { CalendarSalaryType, DateWorkDetail } from '../types/calendar';

type EmployeeCalendarDataContextProps = {
  calendarData: EmployeeCalendarDataResponse | null;
  setCalendarData: (data: EmployeeCalendarDataResponse) => void;
  // getFilteredData: (date: Date) => DateWorkDetail[];
};

const EmployeeCalendarDataContext =
  createContext<EmployeeCalendarDataContextProps>({
    calendarData: null,
    setCalendarData: () => {},
    // getFilteredData: () => [],
  });

export const EmployeeCalendarDataProvider = ({
  children,
}: PropsWithChildren) => {
  const [calendarData, setCalendarData] =
    useState<EmployeeCalendarDataResponse | null>(null);

  // const getFilteredData = (date: Date) => {
  //   const filteredData: DateWorkDetail[] = [];
  //   calendarData?.workPlaceList.forEach((data) => {
  //     data.employeeList.forEach((emp) => {
  //       if (new Date(emp.startTime).toDateString() === date.toDateString()) {
  //         filteredData.push({
  //           ...emp,
  //           workPlaceName: data.workPlaceName,
  //           workPlaceColor: data.workPlaceColorCode,
  //         });
  //       }
  //     });
  //   });
  //   return filteredData;
  // };

  return (
    <EmployeeCalendarDataContext.Provider
      value={{ calendarData, setCalendarData }}
    >
      {children}
    </EmployeeCalendarDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployeeCalendarData = () =>
  useContext(EmployeeCalendarDataContext);
