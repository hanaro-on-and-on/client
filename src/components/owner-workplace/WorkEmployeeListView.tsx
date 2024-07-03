import { FaAngleRight } from 'react-icons/fa6';
import { HStack, VStack } from '../ui/Stack';

type WorkEmployeeListViewProps = {
  workEmployeeId: number;
  employeeName: string;
  monthPay: number;
  fromDay: string;
};

const WorkEmployeeListView = (props: WorkEmployeeListViewProps) => {
  const { employeeName, monthPay, fromDay } = props;

  return (
    <button className='flex bg-white justify-between p-3 items-center border-b border-gray-300 last:border-b-0 hover:bg-gray-200'>
      <VStack>
        <HStack className='items-center'>
          <span className='font-bold text-lg'>{employeeName}</span>
          <FaAngleRight />
        </HStack>
        <div className='text-sm text-gray-400'>{`근무 시작: ${fromDay}`}</div>
      </VStack>

      <div className='text-lg'>{`${monthPay.toLocaleString()} 원`}</div>
    </button>
  );
};

export default WorkEmployeeListView;
