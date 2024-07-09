import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { getColor } from '../../utils/get-color';
import { HStack, VStack } from '../ui/Stack';
import ColorCircle from '../ui/ColorCircle';
import { useNavigate } from 'react-router-dom';
import WorkPlaceName from '../ui/WorkPlaceName';

type MyWorkPlaceListViewProps = {
  workPlaceId: number;
  workPlaceName: string;
  workPlaceColor: string;
  payment: number;
  length: number;
};

const MyWorkPlaceListView = (props: MyWorkPlaceListViewProps) => {
  const navigate = useNavigate();
  const { workPlaceId, workPlaceName, workPlaceColor, payment, length } = props;

  const onClickWorkPlace = () => {
    navigate(`/owner/myWorkPlaces/${workPlaceId}`);
  };

  return (
    <button
      className='flex border border-gray-300 bg-white rounded-md p-4 items-center gap-3 justify-between hover:bg-slate-300'
      onClick={onClickWorkPlace}
    >
      <div className='w-1/12'>
        <ColorCircle workPlaceColor={workPlaceColor} />
      </div>
      <VStack className='text-start w-4/12'>
        <div className='text-ellipsis overflow-hidden whitespace-nowrap'>{`${workPlaceName}`}</div>
        <div className='text-sm text-gray-400 ho'>{`총 ${length}명`}</div>
      </VStack>

      <HStack className='text-nowrap items-end text-sm w-4/12'>
        {payment.toLocaleString()} 원
      </HStack>
      <FaAngleRight />
    </button>
  );
};

export default MyWorkPlaceListView;

{
  /* <button
      className='flex border border-gray-300 bg-white rounded-md p-4 items-center gap-3 justify-between hover:bg-slate-300'
      onClick={onClickWorkPlace}
    >
      <div className='w-1/12'>
        <ColorCircle workPlaceColor={workPlaceColor} />
      </div>
      <VStack className='text-start w-4/12'>
        <div className='text-ellipsis overflow-hidden whitespace-nowrap'>{`${workPlaceName}`}</div>
        <div className='text-sm text-gray-400 ho'>{`총 ${length}명`}</div>
      </VStack>

      <HStack className='text-nowrap items-end text-sm w-4/12'>
        {payment.toLocaleString()} 원
      </HStack>
      <FaAngleRight />
    </button> */
}
