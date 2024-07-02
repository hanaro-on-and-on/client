import { ChangeEvent, useState } from 'react';
import { useAttendance } from '../../contexts/Attendance-Context';
import InputBox from '../ui/InputBox';
import { Spacer, VStack } from '../ui/Stack';
import TimeBox from './TimeBox';
import WorkPlaceName from '../ui/WorkPlaceName';
import SelectOptions from './SelectOptions';
import Select from './Select';
import { getTimeString } from '../../utils/get-TimeString';
import { MINIMUM_PAY_PER_HOUR } from '../../utils/const-value';
import BtnBottom from '../BtnBottom';
import ModalCenter from '../ModalCenter';
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    workPlaceId: 1, // Long
    workPlaceNm: '롯데리아 자양점',
    workPlaceColor: '01', // String
    workPlaceEmployeeId: 10, // Long
    employeeNm: '이신광', // String
  },
  {
    workPlaceId: 1, // Long
    workPlaceNm: '롯데리아 자양점',
    workPlaceColor: '01', // String
    workPlaceEmployeeId: 12, // Long
    employeeNm: '이서하', // String
  },
  {
    workPlaceId: 1, // Long
    workPlaceNm: '롯데리아 자양점',
    workPlaceColor: '01',
    workPlaceEmployeeId: 13, // Long
    employeeNm: '정연주', // String
  },
  {
    workPlaceId: 2, // Long
    workPlaceNm: '버거킹',
    workPlaceColor: '02', // String
    workPlaceEmployeeId: 14, // Long
    employeeNm: '고영우', // String
  },
  {
    workPlaceId: 2, // Long
    workPlaceNm: '버거킹',
    workPlaceColor: '02', // String
    workPlaceEmployeeId: 18, // Long
    employeeNm: '최은진', // String
  },
];

const AttendanceEdit = () => {
  const navigation = useNavigate();

  const [workEmployeeList] = useState(mockData); // 나의 전체 사업장의 전 직원들

  const { attendance, changeAttendance } = useAttendance();
  const [workPlaceEmployeeId, setWorkPlaceEmployeeId] = useState(
    attendance?.workPlaceEmployeeId
  );
  const [startTime, setStartTime] = useState<Date | undefined>(
    attendance?.startTime
  );
  const [endTime, setEndTime] = useState<Date | undefined>(attendance?.endTime);
  const [restMinutes, setRestMinutes] = useState(attendance?.restMinutes);
  const [payPerHour, setPayPerHour] = useState(attendance?.payPerHour);

  const dateUrl = startTime!.toLocaleDateString('en-CA');

  // 모달 관련
  const [isModalOpen, setModalOpen] = useState(false);

  const onSelectWorkEmployeeId = (id: number) => {
    setWorkPlaceEmployeeId(id);
  };

  const onChangePayPerHour = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= MINIMUM_PAY_PER_HOUR) {
      e.target.value = `${MINIMUM_PAY_PER_HOUR}`;
    }
    setPayPerHour(Number(e.target.value));
  };

  const updateTime = (
    date: Date | undefined,
    time: string
  ): Date | undefined => {
    if (!date) return undefined;
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    return newDate;
  };

  return (
    <>
      {isModalOpen && (
        <ModalCenter
          title={' '}
          closeModal={() => setModalOpen(false)}
          hasDecline
          confirmAction={() => navigation(`/owner/calendar/${dateUrl}`)}
        >{`정말로 수정하시겠습니까?`}</ModalCenter>
      )}

      <VStack className='px-6 py-10 gap-6'>
        <InputBox label='근무자명'>
          <Select
            options={workEmployeeList}
            selectedId={workPlaceEmployeeId!}
            onSelect={onSelectWorkEmployeeId}
          />
        </InputBox>
        <InputBox label='근무 시간'>
          <TimeBox
            startTime={getTimeString(attendance!.startTime)}
            changeStartTime={(time: string) =>
              setStartTime(updateTime(startTime, time))
            }
            endTime={getTimeString(attendance!.endTime)}
            changeEndTime={(time: string) =>
              setEndTime(updateTime(endTime, time))
            }
            restMinutes={restMinutes!}
            changeRestMinutes={(minutes: number) => setRestMinutes(minutes)}
          />
        </InputBox>
        <InputBox
          label='시급'
          value={String(payPerHour)}
          onChange={onChangePayPerHour}
        />

        <div className='text-gray-400 text-sm'>
          현재 최저시급은
          <span className='underline'>{`${MINIMUM_PAY_PER_HOUR}`}</span>원
          이에요..
        </div>
        <div className='text-gray-400 text-sm'>
          근무 시간이 4시간 이상이면 30분 이상, <br />
          8시간 이상이면 1시간 이상 휴게시간이 필요해요. <br /> (근로기준법
          54조)
        </div>

        <Spacer />
        <BtnBottom
          text='근무 수정'
          action={() => {
            changeAttendance({
              workPlaceEmployeeId: workPlaceEmployeeId!,
              payPerHour: payPerHour!,
              startTime: startTime!,
              endTime: endTime!,
              restMinutes: restMinutes!,
            });
            setModalOpen(true);
          }}
        />
      </VStack>
    </>
  );
};
export default AttendanceEdit;
