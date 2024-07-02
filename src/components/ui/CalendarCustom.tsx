import { useState } from 'react';
import './CalendarCustom.css';
import Calendar, { OnArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarMark from './CalendarMark';
import { useNavigate } from 'react-router-dom';
import { useCalendarData } from '../../contexts/Calender-Data-Context';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarCustom = () => {
  const [value, setValue] = useState<Value>(new Date());
  const { calendarData } = useCalendarData();
  const navigate = useNavigate();

  const onChangeCurrentDate = (args: OnArgs) => {
    const { action, activeStartDate, value, view } = args;
    console.log('🚀  activeStartDate:', activeStartDate);
    console.log('🚀  view:', view);
    console.log('🚀  value:', value);
    console.log('🚀  action:', action);
    setValue(activeStartDate!);
  };

  const onClickDate = (date: Date) => {
    const localDateString = date.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' 형식
    navigate(`/owner/calendar/${localDateString}`);
  };

  const getEventsForDate = (date: Date) => {
    const events = [];
    calendarData.forEach((workPlace) => {
      workPlace.days.forEach((day) => {
        if (new Date(day.startTime).toDateString() === date.toDateString()) {
          events.push({
            ...day,
            workPlaceName: workPlace.workPlaceName,
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
        onClickDay={onClickDate}
        onActiveStartDateChange={onChangeCurrentDate}
        value={value}
        tileClassName={['h-28']}
        tileContent={tileContent}
      />
    </div>
  );
};
export default CalendarCustom;
