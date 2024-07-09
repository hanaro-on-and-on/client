import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { CalendarSalaryType, DateWorkDetail } from '../types/calendar';

type CalendarDataContextProps = {
  calendarData: CalendarData | null;
  setCalendarData: (data: CalendarData) => void;
  getFilteredData: (date: Date) => DateWorkDetail[];
};

const CalendarDataContext = createContext<CalendarDataContextProps>({
  calendarData: null,
  setCalendarData: () => {},
  getFilteredData: () => [],
});

export const CalendarDataProvider = ({ children }: PropsWithChildren) => {
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);

  const getFilteredData = (date: Date) => {
    const filteredData: DateWorkDetail[] = [];
    calendarData?.workPlaceList.forEach((data) => {
      data.employeeList.forEach((emp) => {
        if (new Date(emp.startTime).toDateString() === date.toDateString()) {
          filteredData.push({
            ...emp,
            workPlaceName: data.workPlaceName,
            workPlaceColor: data.workPlaceColorCode,
          });
        }
      });
    });
    return filteredData;
  };

  return (
    <CalendarDataContext.Provider
      value={{ calendarData, setCalendarData, getFilteredData }}
    >
      {children}
    </CalendarDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendarData = () => useContext(CalendarDataContext);
