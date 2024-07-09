import { useEffect, useState } from 'react';
import './CalendarEmployee.css';
import Calendar, { OnArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../api/apiClient';
import { parseYYYMMDD } from '../../utils/date-util';
import { useEmployeeCalendarData } from '../../contexts/Employee-Calender-Data-Context';
import EmployeeCalendarMark from './EmployeeCalendarMark';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const currentDate = new Date();

const CalendarEmployee = () => {
  const [value, setValue] = useState<Value>(currentDate);
  const { calendarData, setCalendarData } = useEmployeeCalendarData();
  const navigate = useNavigate();

  useEffect(() => {
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = value.getMonth() + 1;
      fetchData(year, month);
    }
  }, [value]);

  const fetchData = async (year: number, month: number) => {
    try {
      const response = await ApiClient.getInstance().getEmployeeCalendarData(
        year,
        month
      );
      console.log('API 호출 결과:', response);
      setCalendarData(response);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  const onChangeCurrentDate = (args: OnArgs) => {
    const { action, activeStartDate, value, view } = args;
    // console.log('🚀  activeStartDate:', activeStartDate);
    // console.log('🚀  view:', view);
    // console.log('🚀  value:', value);
    // console.log('🚀  action:', action);
    setValue(activeStartDate!);
  };

  const onClickDate = (date: Date) => {
    const localDateString = date.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' 형식
    navigate(`/calendar/${localDateString}`);
  };

  const getListForDate = (date: Date) => {
    const list = [];
    calendarData &&
      calendarData.list.map((workPlace) => {
        const result = new Date(
          parseYYYMMDD(workPlace.attendDate)
        ).toDateString();
        if (result === date.toDateString()) {
          list.push({
            ...workPlace,
          });
        }
      });
    return list;
  };

  // const getEventsForDate = (date: Date) => {
  //   const events = [];
  //   calendarData.forEach((workPlace) => {

  //     workPlace.days.forEach((day) => {
  //       if (new Date(day.startTime).toDateString() === date.toDateString()) {
  //         events.push({
  //           ...day,
  //           workPlaceName: workPlace.workPlaceName,
  //           workPlaceColor: workPlace.workPlaceColor,
  //         });
  //       }
  //     });
  //   });
  //   return events;
  // };

  // 날짜 타일에 맞춤 콘텐츠를 추가한다.
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      // const events = getEventsForDate(date);
      const list = getListForDate(date);
      // console.log(list, '>>>>>>>>>>>>>>>>>');
      return (
        // <div>헬로</div>
        <div className='h-full w-full'>
          {list.map((data) => (
            <EmployeeCalendarMark key={`${data.id}`} {...data} />
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
export default CalendarEmployee;
