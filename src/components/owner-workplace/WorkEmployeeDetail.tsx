import { useParams } from 'react-router-dom';
import NavToggle from '../NavToggle';
import { useState } from 'react';
import PayStub from '../../pages/employee/PartTimeTab/PayStub';
import { HStack, VStack } from '../ui/Stack';
import OwnerPayStub from './OwnerPayStub';
import WorkPlaceName from '../ui/WorkPlaceName';

enum ToggleStatus {
  PAYMENT = 'payment',
  WORKTIME = 'worktime',
}

const WorkEmployeeDetail = () => {
  const { placeId, id } = useParams();

  const today = new Date();
  const [selectedToggle, setSelectedToggle] = useState<ToggleStatus>(
    ToggleStatus.PAYMENT
  );
  return (
    <VStack className='m-6 gap-3'>
      <HStack className='border border-gray-300 p-3 rounded-xl justify-evenly items-center gap-3'>
        <WorkPlaceName name='롯데리아' colorType='01' />
        <VStack className='text-start'>
          <div className='font-bold'>최은진</div>
          <div className='text-xs'>근무 시작일: 24.06.01</div>
        </VStack>
      </HStack>

      {/* 토글버튼 */}
      <NavToggle
        first='급여 명세서'
        second='근무 내역'
        firstSelected={() => setSelectedToggle(ToggleStatus.PAYMENT)}
        secondSelected={() => setSelectedToggle(ToggleStatus.WORKTIME)}
      />

      {/* 급여명세서 */}
      {selectedToggle === ToggleStatus.PAYMENT && (
        <OwnerPayStub year={today.getFullYear()} month={today.getMonth()} />
      )}
    </VStack>
  );
};
export default WorkEmployeeDetail;
