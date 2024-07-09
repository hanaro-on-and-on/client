/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate, useParams } from 'react-router-dom';
import BtnChoiceBox from '../ui/BtnChoiceBox';
import { HStack, Spacer, VStack } from '../ui/Stack';
import ThreeLevelUi from '../ui/ThreeLevelUi';
import { useEmployeeContract } from '../../contexts/EmployeeContract-Context';
import TimeBoxForContract from '../owner-calendar/TimeBoxForContract';
import { useEffect, useState } from 'react';
import { DayOfWeek, DayOfWeekShort, WorkTime } from '../../types/contract';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaAngleDown } from 'react-icons/fa6';
import { addSuffixDayOfWeek } from '../../utils/date-util';

const DayOfWeeks: DayOfWeekShort[] = ['월', '화', '수', '목', '금', '토', '일'];

const calculateFutureDate = (daysAhead: number): Date => {
  const today = new Date();
  today.setDate(today.getDate() + daysAhead);
  return today;
};

const WorkEmployeeAddSecond = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();

  // 근무 개시일, 근무 종료일
  const [startWorkDate, setStartWorkDate] = useState<Date | null>(new Date());
  const [endWorkDate, setEndWorkDate] = useState<Date | null>(
    calculateFutureDate(364)
  );
  // 근무장소, 업무내용
  const [workSite, setWorkSite] = useState<string>('');
  const [workDetail, setWorkDetail] = useState<string>('');

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
    const workDayOfWeek = addSuffixDayOfWeek(selectDayOfWeek);

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
          workDayOfWeek: addSuffixDayOfWeek(selectDayOfWeek),
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
    setWorkStartTime(undefined);
    setWorkEndTime(undefined);
    setRestStartTime(undefined);
    setRestEndTime(undefined);
    setErrorMessage('');
  }, [selectDayOfWeek, workTimes]);

  // 요일 버튼을 클릭했을 때 호출되는 함수
  const handleDayClick = (day: DayOfWeekShort) => {
    addWorkTime(); // 현재 시간을 저장
    setSelectDayOfWeek(day); // 선택된 요일을 변경
  };

  const { employeeContract, addSecondInfo, setSecondInfo } =
    useEmployeeContract();

  const onClickAddSecond = () => {
    if (startWorkDate && endWorkDate) {
      addSecondInfo({
        workStartDate: startWorkDate,
        workEndDate: endWorkDate,
        workSite,
        workDetail,
        workTimes,
      });
      setSecondInfo({
        workStartDate: startWorkDate,
        workEndDate: endWorkDate,
        workSite,
        workDetail,
        workTimes,
      });
    }
    navigate(`/owner/myWorkPlaces/${placeId}/addEmployee/third`);
  };

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
            <HStack className='border-b border-gray-300 gap-2 items-baseline'>
              <DatePicker
                id='startWorkDay'
                className='w-20 cursor-pointer'
                dateFormat='yyyy.MM.dd'
                selected={startWorkDate}
                onChange={(date) => setStartWorkDate(date)}
              />
              <label htmlFor='startWorkDate'>
                <FaAngleDown />
              </label>
            </HStack>
          </VStack>

          <VStack className='items-start p-2'>
            <label htmlFor='endWorkDay' className='font-semibold'>
              근로 종료일
            </label>
            <HStack className='border-b border-gray-300 gap-2 items-baseline'>
              <DatePicker
                className='w-20 cursor-pointer'
                id='endWorkDay'
                dateFormat='yyyy.MM.dd'
                selected={endWorkDate}
                onChange={(date) => setEndWorkDate(date)}
              />
              <label htmlFor='endWorkDay'>
                <FaAngleDown />
              </label>
            </HStack>
          </VStack>

          <VStack className='p-2'>
            <label htmlFor='workSite' className='text-left font-semibold'>
              근무장소
            </label>
            <input
              id='workSite'
              value={workSite}
              onChange={(e) => setWorkSite(e.target.value)}
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
              value={workDetail}
              onChange={(e) => setWorkDetail(e.target.value)}
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
              selectedDayofWeek={addSuffixDayOfWeek(selectDayOfWeek)}
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

            {workTimes.map((w) => (
              <div
                key={w.workDayOfWeek}
                className='text-sm text-gray-400'
              >{`${w.workDayOfWeek} - ${w.workStartTime} - ${w.workEndTime}`}</div>
            ))}
          </VStack>
        </VStack>
      </VStack>

      <Spacer />
      <div className='py-6'>
        <BtnChoiceBox
          actionName={'다음'}
          closeName={'이전'}
          onAction={onClickAddSecond}
          onClose={() => history.back()}
        />
      </div>
    </VStack>
  );
};
export default WorkEmployeeAddSecond;
