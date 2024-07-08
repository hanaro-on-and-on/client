import { useNavigate, useParams } from 'react-router-dom';
import { useCalendarData } from '../../contexts/Calender-Data-Context';
import { HStack, VStack } from '../ui/Stack';
import WorkPlaceName from '../ui/WorkPlaceName';
import { getTimeString } from '../../utils/get-TimeString';
import { FaAngleRight } from 'react-icons/fa6';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useAttendance } from '../../contexts/Attendance-Context';
import { DateWorkDetail } from '../../types/calendar';
import { differenceInHours, differenceInMinutes } from 'date-fns';
export type Attendance = {
  attendanceId?: number;
  workPlaceEmployeeId: number;
  payPerHour: number; // 시급
  startTime: Date; // 시작 시간
  endTime: Date; // 끝 시간
  restStartTime: Date;
  restEndTime: Date;
};

// 두 날짜 간의 총 시간을 계산하는 함수
const calculateWorkedHours = (data: DateWorkDetail[]): string => {
  let totalMinutes = 0;

  data.forEach((item) => {
    totalMinutes += differenceInMinutes(item.endTime, item.startTime);
  });

  // 전체 시간 차이 계산
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return `${totalHours}시간 ${remainingMinutes}분`;
};

const onClickChangeAttendance = (data: DateWorkDetail) => {
  return {
    attendenceId: data.attendanceId,
    workPlaceEmployeeId: data.workPlaceEmployeeId,
    payPerHour: data.payment,
    startTime: data.startTime,
    endTime: data.endTime,
    restMinutes: data.restMinute,
  };
};

const DateDetail = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const { calendarData, getFilteredData } = useCalendarData();
  const { changeAttendance } = useAttendance();

  const onClickEditAttendance = (attendanceId: number) => {
    navigate(`/owner/calendar/attendance/${attendanceId}/edit`);
  };
  const onClickAddAttendance = () => {
    navigate(`/owner/calendar/${date}/add`);
  };

  const targetDate = new Date(date!);

  const temp = getFilteredData(targetDate);
  console.log(temp);

  return (
    <div className='px-6 py-7'>
      <VStack className='gap-3'>
        <HStack className='justify-between items-center'>
          <div className='text-sm text-gray-400'>
            총 근무 시간: {calculateWorkedHours(temp)}
          </div>
          <button
            className='bg-hanaLightGreen gap-2 py-1 px-2 flex items-center rounded-lg text-white'
            onClick={onClickAddAttendance}
          >
            <AiOutlinePlusCircle />
            <div>근무 추가</div>
          </button>
        </HStack>

        {temp &&
          temp.map((item) => (
            <button
              key={item.attendanceId}
              onClick={() => {
                changeAttendance({
                  attendanceId: item.attendanceId,
                  workPlaceEmployeeId: item.workPlaceEmployeeId,
                  payPerHour: item.payment,
                  startTime: item.startTime,
                  endTime: item.endTime,
                  restMinutes: item.restMinute,
                }),
                  onClickEditAttendance(item.attendanceId);
              }}
              className='px-1 py-3 w-full rounded-lg border border-hanaLightGreen bg-white'
            >
              <HStack className='justify-around items-center'>
                <WorkPlaceName
                  name={`${item.workPlaceName}`}
                  colorType={`${item.workPlaceColor}`}
                />
                <VStack className=''>
                  <div className='text-lg'>{`${item.employeeName}`}</div>
                  <div className='text-sm'>{`${getTimeString(new Date(item.startTime))} - ${getTimeString(new Date(item.endTime))}`}</div>
                </VStack>
                <FaAngleRight />
              </HStack>
            </button>
          ))}
      </VStack>
    </div>
  );
};

export default DateDetail;
