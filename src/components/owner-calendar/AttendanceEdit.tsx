import { ChangeEvent, useEffect, useState } from 'react';
import { useAttendance } from '../../contexts/Attendance-Context';
import InputBox from '../ui/InputBox';
import { Spacer, VStack } from '../ui/Stack';
import TimeBox from './TimeBox';
import Select from './Select';
import { getTimeString } from '../../utils/get-TimeString';
import { MINIMUM_PAY_PER_HOUR } from '../../utils/const-value';
import ModalCenter from '../ModalCenter';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../../api/apiClient';
import BtnBottom from '../BtnBottom';
import { convertToISOFormat, formatDate } from '../../utils/date-util';

const krToISODate = (date: Date) => {
  const iso = convertToISOFormat(date);
  return formatDate(new Date(iso));
};
const AttendanceEdit = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  const [workEmployeeList, setworkEmployeeList] = useState<Employee[]>([]); // 나의 전체 사업장의 전 직원들
  const [attendance, setAttendance] = useState<AttendanceResponse | undefined>(
    undefined
  );

  // const { attendance, changeAttendance } = useAttendance();
  // console.log(attendance);
  const [workPlaceEmployeeId, setWorkPlaceEmployeeId] = useState<
    number | undefined
  >();
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  // console.log('🚀  AttendanceEdit  startTime:', startTime);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [restMinute, setRestMinute] = useState<number>(0);
  const [payPerHour, setPayPerHour] = useState<number>(MINIMUM_PAY_PER_HOUR);

  useEffect(() => {
    fetchGetEmplyees('WORKING');
  }, []);
  useEffect(() => {
    id && fetchGetAttendance(Number(id));
  }, [id]);
  useEffect(() => {
    if (attendance) {
      setWorkPlaceEmployeeId(attendance.workPlaceEmployeeId);
      setStartTime(attendance.startTime);
      setEndTime(attendance.endTime);
      setRestMinute(attendance.restMinute);
      setPayPerHour(attendance.payPerHour);
    }
  }, [attendance]);

  const fetchGetAttendance = async (id: number) => {
    try {
      const response = await ApiClient.getInstance().getAttendance(id);
      console.log('API 호출 결과:', response);
      setAttendance(response);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };
  const fetchGetEmplyees = async (workingStatus: string) => {
    try {
      const response =
        await ApiClient.getInstance().getMyEmployees(workingStatus);
      console.log('API 호출 결과:', response);
      setworkEmployeeList(response.employeeList);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };
  const fetchUpdateAttendance = async (
    id: number,
    request: UpdateAttendanceRequest
  ) => {
    try {
      const response = await ApiClient.getInstance().updateAttendance(
        id,
        request
      );
      console.log('API 호출 결과:', response);
      return response;
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false); // 모달 관련

  const onClickConfirm = async () => {
    if (id && workPlaceEmployeeId && startTime && endTime) {
      const response = await fetchUpdateAttendance(Number(id), {
        workPlaceEmployeeId,
        payPerHour,
        startTime: convertToISOFormat(startTime),
        endTime: convertToISOFormat(endTime),
        restMinute,
      });
      response && navigation(`/owner/calendar/${krToISODate(startTime)}`);
    }
  };

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
          confirmAction={onClickConfirm}
        >{`정말로 수정하시겠습니까?`}</ModalCenter>
      )}

      {attendance && (
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
              startTime={getTimeString(attendance.startTime)}
              // startTime='10:00'
              changeStartTime={(time: string) =>
                setStartTime(updateTime(startTime, time))
              }
              endTime={getTimeString(attendance.endTime)}
              // endTime='12:00'
              changeEndTime={(time: string) =>
                setEndTime(updateTime(endTime, time))
              }
              restMinutes={restMinute}
              changeRestMinutes={(minutes: number) => setRestMinute(minutes)}
            />
          </InputBox>
          <InputBox
            label='시급'
            value={String(payPerHour)}
            onChange={onChangePayPerHour}
          />

          <div className='text-gray-400 text-sm'>
            <span>현재 최저시급은 </span>
            <span className='underline'>{`${MINIMUM_PAY_PER_HOUR}`}</span>원
            <span>이에요.</span>
          </div>
          <div className='text-gray-400 text-sm'>
            근무 시간이 4시간 이상이면 30분 이상, <br />
            8시간 이상이면 1시간 이상 휴게시간이 필요해요. <br />
            (근로기준법 54조)
          </div>

          <Spacer />
          <BtnBottom text='근무 수정' action={() => setModalOpen(true)} />
        </VStack>
      )}
    </>
  );
};
export default AttendanceEdit;
