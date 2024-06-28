import calculateDailyWage from '../../utils/get-DailyPay';
import { getColor } from '../../utils/get-color';

type CalendarMarkProps = {
  attendanceId: number;
  workPlaceEmployeeId: number;
  employeeName: string;
  attendanceType: string;
  payPerHour: number;
  startTime: string;
  endTime: string;
  workPlaceName: string;
  workPlaceColor: string;
};

const CalendarMark = (props: CalendarMarkProps) => {
  const { employeeName, workPlaceColor, payPerHour, startTime, endTime } =
    props;

  const total = calculateDailyWage(startTime, endTime, payPerHour);

  return (
    <div
      className={`px-1 rounded-lg text-nowrap text-xs ${getColor(workPlaceColor)}`}
      style={{ minWidth: 'fit-content' }}
    >{`${total}`}</div>
  );
};

export default CalendarMark;
