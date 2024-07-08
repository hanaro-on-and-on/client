import { useNavigate, useParams } from 'react-router-dom';
import BtnChoiceBox from '../ui/BtnChoiceBox';
import { HStack, Spacer, VStack } from '../ui/Stack';
import ThreeLevelUi from '../ui/ThreeLevelUi';
import { useEmployeeContract } from '../../contexts/EmployeeContract-Context';
import TimeBoxForContract from '../owner-calendar/TimeBoxForContract';
import { useEffect, useState } from 'react';
import { DayOfWeek, WorkTime } from '../../types/contract';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export type DayOfWeekShort = '월' | '화' | '수' | '목' | '금' | '토' | '일';
const DayOfWeeks: DayOfWeekShort[] = ['월', '화', '수', '목', '금', '토', '일'];

const addSuffix = (day: DayOfWeekShort) => {
  return `${day}요일` as DayOfWeek;
};

const calculateFutureDate = (daysAhead: number): Date => {
  const today = new Date();
  today.setDate(today.getDate() + daysAhead);
  return today;
};

const WorkEmployeeAddSecond = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();

  const [startWorkDate, setStartWorkDate] = useState<Date | null>(new Date());
  const [endWorkDate, setEndWorkDate] = useState<Date | null>(
    calculateFutureDate(364)
  );

  const [selectDayOfWeek, setSelectDayOfWeek] = useState<DayOfWeekShort>('월');
  const [workTimes, setWorkTimes] = useState<WorkTime[]>([]);
  console.log('🚀  WorkEmployeeAddSecond  workTimes:', workTimes);

  const [workStartTime, setWorkStartTime] = useState<string | undefined>(
    undefined
  );
  const [workEndTime, setWorkEndTime] = useState<string | undefined>(undefined);
  const [restStartTime, setRestStartTime] = useState<string | undefined>(
    undefined
  );
  const [restEndTime, setRestEndTime] = useState<string | undefined>(undefined);

  // 오류 메시지 상태
  const [errorMessage, setErrorMessage] = useState('');

  // 현재 설정된 시간을 유효성 검사하고 유효한 경우 workTimes에 저장하는 함수
  const addWorkTime = () => {
    const workDayOfWeek = addSuffix(selectDayOfWeek);

    // 모든 시간 데이터가 유효하고 오류 메시지가 없을 때만 저장
    if (
      workStartTime &&
      workEndTime &&
      restStartTime &&
      restEndTime &&
      !errorMessage
    ) {
      // 새로운 workTimes 배열을 만들어서 상태 업데이트
      const newWorkTimes = [
        ...workTimes.filter((w) => w.workDayOfWeek !== workDayOfWeek),
        {
          workDayOfWeek: addSuffix(selectDayOfWeek),
          workStartTime,
          workEndTime,
          restStartTime,
          restEndTime,
        },
      ];
      setWorkTimes(newWorkTimes);
    }
  };

  useEffect(() => {
    // 현재 선택된 요일에 해당하는 근무 시간을 찾아서 상태를 업데이트
    const s = workTimes.find(
      (w) => w.workDayOfWeek === addSuffix(selectDayOfWeek)
    );
    console.log(s);
    // setWorkStartTime(s ? s.workStartTime : undefined);
    // setWorkEndTime(s ? s.workEndTime : undefined);
    // setRestStartTime(s ? s.restStartTime : undefined);
    // setRestEndTime(s ? s.restEndTime : undefined);
    // setErrorMessage('');
  }, [selectDayOfWeek, workTimes]);

  // // workTimes나 selectDayOfWeek가 변경될 때, 해당 요일의 시간을 설정
  // useEffect(() => {
  //   const s = workTimes.find(
  //     (w) => w.workDayOfWeek === addSuffix(selectDayOfWeek)
  //   );
  //   if (s) {
  //     setWorkStartTime(s.workStartTime);
  //     setWorkEndTime(s.workEndTime);
  //     setRestStartTime(s.restStartTime);
  //     setRestEndTime(s.restEndTime);
  //   }
  // }, [workTimes, selectDayOfWeek]);

  // 요일 버튼을 클릭했을 때 호출되는 함수
  const handleDayClick = (day: DayOfWeekShort) => {
    addWorkTime(); // 현재 시간을 저장
    setSelectDayOfWeek(day); // 선택된 요일을 변경
  };

  const { employeeContract, addSecondInfo } = useEmployeeContract();

  return (
    <VStack className='p-6 h-full'>
      <VStack className='gap-6'>
        <div className='text-2xl font-semibold'>
          {employeeContract?.workPlaceNm}
        </div>

        <ThreeLevelUi level={2} />

        <VStack className='border border-gray-300 rounded-lg p-3 gap-4 overflow-y-scroll'>
          <VStack className='items-start p-2'>
            <label htmlFor='startWorkDay' className='font-semibold'>
              근로 시작일
            </label>
            <DatePicker
              id='startWorkDay'
              className='border-b border-gray-300 '
              dateFormat='yyyy.MM.dd'
              selected={startWorkDate}
              onChange={(date) => setStartWorkDate(date)}
            />
          </VStack>

          <VStack className='items-start p-2'>
            <label htmlFor='endWorkDay' className='font-semibold'>
              근로 종료일
            </label>
            <DatePicker
              className='border-b border-gray-300'
              id='endWorkDay'
              dateFormat='yyyy.MM.dd'
              selected={endWorkDate}
              onChange={(date) => setEndWorkDate(date)}
            />
          </VStack>

          <VStack className='p-2'>
            <label htmlFor='workSite' className='text-left font-semibold'>
              근무장소
            </label>
            <input
              id='workSite'
              className='border-b border-b-gray-300'
              placeholder='근무장소를 적어주세요.'
            />
          </VStack>

          <VStack className='p-2'>
            <label htmlFor='workDetail' className='text-left font-semibold'>
              업무 내용
            </label>
            <input
              id='workDetail'
              className='border-b border-b-gray-300'
              placeholder='근무자의 업무 내용을 적어주세요.'
            />
          </VStack>

          <VStack className='p-2 gap-2'>
            <label htmlFor='workTimes' className='text-left font-semibold'>
              근로일 등록
            </label>

            {/* 요일 선택 버튼 */}
            <div className='flex flex-row justify-center'>
              {DayOfWeeks.map((day) => (
                <button
                  className={`${selectDayOfWeek === day ? 'bg-hanaLightGreen text-white' : ''} border-r border-t border-b border-gray-300 px-3 py-1 first:rounded-l-lg first:border-l last:rounded-r-lg`}
                  key={day}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <TimeBoxForContract
              selectedDayofWeek={addSuffix(selectDayOfWeek)}
              startTime={workStartTime}
              changeStartTime={(time: string) => {
                setWorkStartTime(time);
              }}
              endTime={workEndTime}
              changeEndTime={(time: string) => {
                setWorkEndTime(time);
              }}
              restStartTime={restStartTime}
              changeRestStartTime={(time: string) => {
                setRestStartTime(time);
              }}
              restEndTime={restEndTime}
              changeRestEndTime={(time: string) => {
                setRestEndTime(time);
              }}
              setErrorMessage={setErrorMessage}
            />
            {errorMessage && (
              <div className='text-red-400 text-sm'>{errorMessage}</div>
            )}
          </VStack>
        </VStack>
      </VStack>

      <Spacer />
      <div className='py-6'>
        <BtnChoiceBox
          actionName={'다음'}
          closeName={'이전'}
          onAction={() => {}}
          onClose={() => history.back()}
        />
      </div>
    </VStack>
  );
};
export default WorkEmployeeAddSecond;
