import { FaAngleRight } from 'react-icons/fa6';
import { HStack, VStack } from '../ui/Stack';

type WorkEmployeeListViewProps = {
  workPlaceEmployeeId: number;
  employeeName: string;
  workStartDate: string;
  payment: number;
};

const WorkEmployeeListView = (props: WorkEmployeeListViewProps) => {
  const { employeeName, workStartDate, payment } = props;

  return (
    <button className='flex bg-white justify-between p-3 items-center border-b border-gray-300 last:border-b-0 hover:bg-gray-200 first:rounded-t-lg last:rounded-b-lg'>
      <VStack>
        <HStack className='items-center'>
          <span className='font-bold text-lg'>{employeeName}</span>
          <FaAngleRight />
        </HStack>
        <div className='text-sm text-gray-400'>{`근무 시작: ${workStartDate}`}</div>
      </VStack>

      <div className='text-lg'>{`${payment.toLocaleString()} 원`}</div>
    </button>
  );
};

export default WorkEmployeeListView;
