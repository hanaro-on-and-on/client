import { useNavigate, useParams } from 'react-router-dom';
import { useCalendarData } from '../../contexts/Calender-Data-Context';
import { HStack, VStack } from '../ui/Stack';
import WorkPlaceName from '../ui/WorkPlaceName';
import { getTimeString } from '../../utils/get-TimeString';
import { FaAngleRight } from 'react-icons/fa6';
import { AiOutlineAccountBook, AiOutlinePlusCircle } from 'react-icons/ai';
import { useAttendance } from '../../contexts/Attendance-Context';
import { DateWorkDetail } from '../../types/calendar';
export type Attendance = {
  attendanceId?: number;
  workPlaceEmployeeId: number;
  payPerHour: number; // 시급
  startTime: Date; // 시작 시간
  endTime: Date; // 끝 시간
  restStartTime: Date;
  restEndTime: Date;
};
const onClickChangeAttendance = (data: DateWorkDetail) => {
  return {
    attendenceId: data.attendanceId,
    workPlaceEmployeeId: data.workPlaceEmployeeId,
    payPerHour: data.payPerHour,
    startTime: data.startTime,
    endTime: data.endTime,
    restMinutes: data.restMinutes,
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

  const targetDate = new Date(date!);

  const temp = getFilteredData(targetDate);
  // console.log(temp);

  return (
    <div className='px-6 py-7'>
      <VStack className='gap-3'>
        <HStack className='justify-between items-center'>
          <div>총 근무 시간: 8시간 이거 꼭 바꿔야함</div>
          <button className='bg-hanaLightGreen gap-2 py-1 px-2 flex items-center rounded-lg text-white'>
            <AiOutlinePlusCircle />
            <div>근무 추가</div>
          </button>
        </HStack>

        {temp.map((item) => (
          <button
            key={item.attendanceId}
            onClick={() => {
              changeAttendance({
                attendanceId: item.attendanceId,
                workPlaceEmployeeId: item.workPlaceEmployeeId,
                payPerHour: item.payPerHour,
                startTime: item.startTime,
                endTime: item.endTime,
                restMinutes: item.restMinutes,
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
                <div className='text-sm'>{`${getTimeString(item.startTime)} - ${getTimeString(temp[0].endTime)}`}</div>
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
