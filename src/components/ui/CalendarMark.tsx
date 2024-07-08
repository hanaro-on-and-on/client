import calculateDailyWage from '../../utils/get-DailyPay';
import { getColor } from '../../utils/get-color';
import { HStack } from './Stack';

type CalendarMarkProps = {
  workPlaceName: string;
  workPlaceColor: string;
  attendDate: string;
  payment: number;
  employeeSize: number;
  // employeeList: Employee[];
};

const CalendarMark = (props: CalendarMarkProps) => {
  const { workPlaceName, workPlaceColor, attendDate, payment, employeeSize } =
    props;

  return (
    <div
      className={`flex flex-row rounded-lg border gap-0.5 border-red-300 text-2xs items-left`}
    >
      <div className='font-semibold bg-red-300 rounded-lg pr-1'>
        {employeeSize}
      </div>
      <span className='font-semibold'>{payment.toLocaleString()}</span>
    </div>
    // <div
    //   className={`px-1 rounded-lg text-nowrap text-xs ${getColor(workPlaceColor)}`}
    //   style={{ minWidth: 'fit-content' }}
    // >{`${payment}`}</div>
  );
};

export default CalendarMark;
