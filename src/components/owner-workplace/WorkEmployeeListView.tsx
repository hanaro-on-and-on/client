import { FaAngleRight } from 'react-icons/fa6';
import { HStack, VStack } from '../ui/Stack';
import { useNavigate } from 'react-router-dom';

type WorkEmployeeListViewProps = {
  workPlaceEmployeeId: number;
  employeeName: string;
  workStartDate: string;
  payment: number;
};
type Prop = {
  employeeInfo: WorkEmployeeListViewProps;
  placeId: number;
};

const WorkEmployeeListView = ({ employeeInfo, placeId }: Prop) => {
  const { employeeName, workStartDate, payment } = employeeInfo;
  const navigation = useNavigate();

  return (
    <button
      className='flex bg-white justify-between p-3 items-center border-b border-gray-300 last:border-b-0 hover:bg-gray-200 first:rounded-t-lg last:rounded-b-lg'
      onClick={() => {
        navigation(
          `/owner/myWorkPlaces/${placeId}/employees/${employeeInfo.workPlaceEmployeeId}`
        );
      }}
    >
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
