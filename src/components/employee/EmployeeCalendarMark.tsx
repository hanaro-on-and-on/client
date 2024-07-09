import { FaCircle } from 'react-icons/fa6';
import calculateDailyWage from '../../utils/get-DailyPay';
import { getBorderColor, getColor, getTextColor } from '../../utils/get-color';
import { HStack } from './Stack';

type EmployeeCalendarMarkProps = {
  id: number;
  workPlaceName: string;
  workPlaceColorCode: string;
  attendDate: string;
  attendanceType: string;
  payment: number;
  startTime: string;
  endTime: string;
  restMinute: number;
  isConnected: boolean;
};

const EmployeeCalendarMark = (props: EmployeeCalendarMarkProps) => {
  const {
    id,
    workPlaceName,
    workPlaceColorCode,
    attendDate,
    attendanceType,
    payment,
  } = props;

  return (
    <div
      className={`flex flex-row rounded-lg border gap-0.5 ${getBorderColor(workPlaceColorCode)} items-center px-0.5`}
    >
      {/* <div
        className={`font-semibold ${getColor(workPlaceColorCode)} rounded-lg pr-1`}
      >
        {'hi'}
      </div> */}
      <div
        className={`text-2xs ${getColor(workPlaceColorCode)} ${getTextColor(workPlaceColorCode)} rounded-full h-2 w-2`}
      >
        _
      </div>
      <span className='font-semibold text-2xs'>{payment.toLocaleString()}</span>
    </div>
    // <div
    //   className={`px-1 rounded-lg text-nowrap text-xs ${getColor(workPlaceColor)}`}
    //   style={{ minWidth: 'fit-content' }}
    // >{`${payment}`}</div>
  );
};

export default EmployeeCalendarMark;
