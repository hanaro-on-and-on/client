import { useParams } from 'react-router-dom';
import NavToggle from '../NavToggle';
import { useEffect, useState } from 'react';
import { HStack, VStack } from '../ui/Stack';
import OwnerPayStub from './OwnerPayStub';
import WorkPlaceName from '../ui/WorkPlaceName';
import ApiClient from '../../api/apiClient';

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

  const [employeeInfo, setEmployeeInfo] = useState<OwnerGetEmployeeInfo | null>(
    null
  );

  const getEmployeeInfo = async (workPlaceEmployeeId: number) => {
    if (!id) return;
    try {
      const response: OwnerGetEmployeeInfo =
        await ApiClient.getInstance().getEmmplyeeInfo(workPlaceEmployeeId);

      console.log('야야양야야', response);
      setEmployeeInfo(response);
    } catch (err) {
      console.log('에에에러러러러러', err);
    }
  };

  useEffect(() => {
    if (id) {
      getEmployeeInfo(+id);
    }
  }, []);
  return (
    <VStack className='m-6 gap-3'>
      <VStack className='border border-gray-300 p-3 rounded-xl justify-evenly items-center gap-3'>
        <WorkPlaceName
          name={employeeInfo?.workPlaceName || ''}
          colorType={employeeInfo?.colorTypeCode || ''}
        />
        <HStack className='text-start'>
          <div className='flex items-center gap-5'>
            <div className='font-bold'>{employeeInfo?.employeeName}</div>
            <div className='text-xs text-center'>
              근무 시작일: {employeeInfo?.workStartDate}
            </div>
          </div>
        </HStack>
      </VStack>

      {/* 토글버튼 */}
      <NavToggle
        first='급여 명세서'
        second='근무 내역'
        firstSelected={() => setSelectedToggle(ToggleStatus.PAYMENT)}
        secondSelected={() => setSelectedToggle(ToggleStatus.WORKTIME)}
      />

      {/* 급여명세서 */}
      {selectedToggle === ToggleStatus.PAYMENT && (
        <OwnerPayStub
          year={today.getFullYear()}
          month={today.getMonth()}
          workPlaceEmployeeId={Number(id)}
        />
      )}
    </VStack>
  );
};
export default WorkEmployeeDetail;
