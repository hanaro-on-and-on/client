import { CgBorderStyleSolid } from 'react-icons/cg';
import { HStack, VStack } from '../ui/Stack';
import { FaAngleDown } from 'react-icons/fa6';

const TimeBox = () => {
  return (
    <VStack className='mx-auto'>
      <HStack className='justify-center items-center'>
        <div className='font-semibold text-sm me-3'>근무 시간</div>
        <HStack className='border-b-2 border-b-black font-bold items-center'>
          10:30
          <FaAngleDown />
        </HStack>
        <CgBorderStyleSolid />
        <HStack className='border-b-2 border-b-black font-bold items-center'>
          20:00 <FaAngleDown />
        </HStack>
      </HStack>
      <HStack className='justify-center items-center'>
        <div className='font-semibold text-sm me-3'>휴게 시간</div>
        <HStack className='border-b-2 border-b-black font-bold items-center'>
          18:00 <FaAngleDown />
        </HStack>
        <CgBorderStyleSolid />
        <HStack className='border-b-2 border-b-black font-bold items-center'>
          18:30 <FaAngleDown />
        </HStack>
      </HStack>
    </VStack>
  );
};

export default TimeBox;
