import { ChangeEvent, useEffect, useState } from 'react';
import InputBox from '../ui/InputBox';
import { Spacer, VStack } from '../ui/Stack';
import TimeBox from './TimeBox';
import Select from './Select';
import { MINIMUM_PAY_PER_HOUR } from '../../utils/const-value';
import ModalCenter from '../ModalCenter';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../../api/apiClient';
import BtnBottom from '../BtnBottom';
import { convertToISOFormat } from '../../utils/date-util';

const convertDate = (
  date: string | undefined,
  time: string | undefined
): Date | undefined => {
  if (!date || !time) return undefined;
  const newDate = new Date(date);
  const [hours, minutes] = time.split(':').map(Number);
  newDate.setHours(hours, minutes);
  return newDate;
};

const AttendanceCreate = () => {
  const navigation = useNavigate();
  const { date } = useParams();

  const [workEmployeeList, setworkEmployeeList] = useState<Employee[]>([]); // 나의 전체 사업장의 전 직원들
  const fetchData = async (workingStatus: string) => {
    try {
      const response =
        await ApiClient.getInstance().getMyEmployees(workingStatus);
      console.log('API 호출 결과:', response);
      setworkEmployeeList(response.employeeList);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };
  useEffect(() => {
    fetchData('WORKING');
  }, []);

  const [workPlaceEmployeeId, setWorkPlaceEmployeeId] = useState<
    number | undefined
  >(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  console.log('🚀  AttendanceCreate  startDate:', startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  console.log('🚀  AttendanceCreate  endDate:', endDate);
  const [restMinutes, setRestMinutes] = useState(0);
  const [payPerHour, setPayPerHour] = useState(MINIMUM_PAY_PER_HOUR);
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);

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

  const fetchAttendance = async (request: RegisterAttendanceManualRequest) => {
    try {
      const response =
        await ApiClient.getInstance().registerAttendance(request);
      console.log('API 호출 결과:', response);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  const onClickConfirm = async () => {
    if (workPlaceEmployeeId && startDate && endDate) {
      const request = {
        workPlaceEmployeeId,
        payPerHour,
        startTime: convertToISOFormat(startDate),
        endTime: convertToISOFormat(endDate),
        restMinute: restMinutes,
      };
      console.log(request);
      await fetchAttendance(request);
      navigation(`/owner/calendar/${date}`, { replace: true });
    }
  };

  useEffect(() => {
    setStartDate(convertDate(date, startTime));
    setEndDate(convertDate(date, endTime));
  }, [date, startTime, endTime]);

  // // KST로 초기 시간을 설정
  // useEffect(() => {
  //   const nowKST = moment().tz('Asia/Seoul');
  //   setTime(nowKST.format('HH:mm'));
  // }, []);

  return (
    <>
      {isModalOpen && (
        <ModalCenter
          title={' '}
          closeModal={() => setModalOpen(false)}
          hasDecline
          confirmAction={onClickConfirm}
        >{`추가하시겠습니까?`}</ModalCenter>
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
            startTime={startTime}
            changeStartTime={(time: string) => setStartTime(time)}
            endTime={endTime}
            changeEndTime={(time: string) => setEndTime(time)}
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
          {`현재 최저시급은 `}
          <span className='underline'>{`${MINIMUM_PAY_PER_HOUR}`}</span>원
          이에요.
        </div>
        <div className='text-gray-400 text-sm'>
          근무 시간이 4시간 이상이면 30분 이상, <br />
          8시간 이상이면 1시간 이상 휴게시간이 필요해요. <br /> (근로기준법
          54조)
        </div>

        <Spacer />
        <BtnBottom
          text='근무 추가'
          action={() => {
            // changeAttendance({
            //   workPlaceEmployeeId: workPlaceEmployeeId!,
            //   payPerHour: payPerHour!,
            //   startTime: startTime!,
            //   endTime: endTime!,
            //   restMinutes: restMinutes!,
            // });
            setModalOpen(true);
          }}
        />
      </VStack>
    </>
  );
};
export default AttendanceCreate;
