import { useState } from 'react';
import './CalendarCustom.css';
import Calendar, { OnArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarMark from './CalendarMark';

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
        startTime: '2024-06-26T10:30:00',
        endTime: '2024-06-26T14:30:00',
      },
      {
        attendanceId: 2460,
        workPlaceEmployeeId: 10,
        employeeName: '이신광',
        attendanceType: 'expect', // expect, real
        payPerHour: 10000,
        startTime: '2024-06-30T09:30:00',
        endTime: '2024-06-30T18:30:00',
      },
      {
        attendanceId: 2461,
        workPlaceEmployeeId: 12,
        employeeName: '이서하',
        attendanceType: 'expect', // expect, real
        payPerHour: 12000,
        startTime: '2024-06-30T09:30:00',
        endTime: '2024-06-30T18:30:00',
      },
      {
        attendanceId: 2991,
        workPlaceEmployeeId: 12,
        employeeName: '이서하',
        attendanceType: 'real', // expect, real
        payPerHour: 9910,
        startTime: '2024-06-28T09:30:00',
        endTime: '2024-06-28T18:30:00',
      },
    ],
  },
  {
    workPlaceId: 2,
    workPalceName: '버거킹',
    workPlaceColor: '02',
    days: [
      {
        attendanceId: 1999,
        workPlaceEmployeeId: 15,
        employeeName: '정연주',
        attendanceType: 'real', // expect, real
        payPerHour: 10000,
        startTime: '2024-06-26T10:30:00',
        endTime: '2024-06-26T14:30:00',
      },
      {
        attendanceId: 2464,
        workPlaceEmployeeId: 18,
        employeeName: '최은진',
        attendanceType: 'expect', // expect, real
        payPerHour: 12000,
        startTime: '2024-06-29T09:30:00',
        endTime: '2024-06-29T18:30:00',
      },
      {
        attendanceId: 2479,
        workPlaceEmployeeId: 18,
        employeeName: '최은진',
        attendanceType: 'expect', // expect, real
        payPerHour: 12000,
        startTime: '2024-06-30T09:30:00',
        endTime: '2024-06-30T18:30:00',
      },
    ],
  },
];

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarCustom = () => {
  const [value, setValue] = useState<Value>(new Date());
  // const [value, setValue] = useState<Date>(new Date());
  const [data, setData] = useState(mockData);

  const onChangeCurrentDate = (args: OnArgs) => {
    const { action, activeStartDate, value, view } = args;
    console.log('🚀  activeStartDate:', activeStartDate);
    console.log('🚀  view:', view);
    console.log('🚀  value:', value);
    console.log('🚀  action:', action);
    setValue(activeStartDate!);
  };

  const getEventsForDate = (date: Date) => {
    const events = [];
    data.forEach((workPlace) => {
      workPlace.days.forEach((day) => {
        if (new Date(day.startTime).toDateString() === date.toDateString()) {
          events.push({
            ...day,
            workPlaceName: workPlace.workPalceName,
            workPlaceColor: workPlace.workPlaceColor,
          });
        }
      });
    });
    return events;
  };

  // 날짜 타일에 맞춤 콘텐츠를 추가한다.
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const events = getEventsForDate(date);
      return (
        <div className='h-full w-full'>
          {events.map((event) => (
            <CalendarMark key={event.attendanceId} {...event} />
            // <div
            //   key={event.attendanceId}
            //   className={`text-xs p-1 rounded-md mb-1 bg-color-${event.workPlaceColor}`}
            //   title={`${event.employeeName} - ${event.workPlaceName}`}
            // >
            //   {event.employeeName} - {event.workPlaceName}
            // </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className='rounded-mdw-ful'>
      <Calendar
        locale='en'
        className={'w-full'}
        onChange={setValue}
        onActiveStartDateChange={onChangeCurrentDate}
        value={value}
        tileClassName={['h-28']}
        tileContent={tileContent}
      />
    </div>
  );
};
export default CalendarCustom;
