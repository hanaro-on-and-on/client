import { useEffect, useState } from 'react';
import './CalendarCustom.css';
import Calendar, { OnArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarMark from './CalendarMark';
import { useNavigate } from 'react-router-dom';
import { useCalendarData } from '../../contexts/Calender-Data-Context';
import ApiClient from '../../api/apiClient';
import { parseYYYMMDD } from '../../utils/date-util';
import { HStack, VStack } from './Stack';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const currentDate = new Date();

const CalendarCustom = () => {
  const [value, setValue] = useState<Value>(currentDate);
  const { calendarData, setCalendarData } = useCalendarData();
  const navigate = useNavigate();

  console.log('🚀  CalendarCustom  value:', value);

  const convertDate = new Date(value!.toString());

  useEffect(() => {
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = value.getMonth() + 1;
      fetchData(year, month);
    }
  }, [value]);

  const fetchData = async (year: number, month: number) => {
    try {
      const response = await ApiClient.getInstance().getCalendarData(
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
    navigate(`/owner/calendar/${localDateString}`);
  };

  const getListForDate = (date: Date) => {
    const list = [];
    calendarData &&
      calendarData.workPlaceList.map((workPlace) => {
        if (
          new Date(parseYYYMMDD(workPlace.attendDate)).toDateString() ===
          date.toDateString()
        ) {
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
      return (
        <div className='h-full w-full'>
          {list.map((data) => (
            <CalendarMark
              key={`${data.attendDate}_${data.payment}_${data.workPlaceName}`}
              {...data}
            />
          ))}
          {/* {events.map((event) => (
            <CalendarMark key={event.attendanceId} {...event} />
            // <div
            //   key={event.attendanceId}
            //   className={`text-xs p-1 rounded-md mb-1 bg-color-${event.workPlaceColor}`}
            //   title={`${event.employeeName} - ${event.workPlaceName}`}
            // >
            //   {event.employeeName} - {event.workPlaceName}
            // </div>
          ))} */}
        </div>
      );
    }
  };

  return (
    <VStack className='my-6 gap-3'>
      <HStack className='justify-between items-center m-2'>
        <HStack className='gap-2 items-center'>
          <span className='font-bold text-2xl'>
            {`${convertDate.getFullYear()}년`}
          </span>
          <span className='text-2xl font-bold'>{`${convertDate.getMonth() + 1}월`}</span>
        </HStack>
        <HStack>
          <VStack className='border border-hanaLightGreen rounded-lg py-1 px-3'>
            <span className='text-sm'>어제까지 급여</span>
            <span className='text-lg font-semibold'>
              {`${calendarData ? calendarData.currentPayment.toLocaleString() : 0} 원`}
            </span>
          </VStack>
          <VStack className='border border-hanaLightGreen rounded-lg py-1 px-3 bg-hanaLightGreen text-white'>
            <span className='text-sm font-semibold'>이번달 예상 급여</span>
            <span className='text-lg font-semibold'>
              {`${calendarData ? calendarData.totalPayment.toLocaleString() : 0} 원`}
            </span>
          </VStack>
        </HStack>
      </HStack>

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
    </VStack>
  );
};
export default CalendarCustom;
