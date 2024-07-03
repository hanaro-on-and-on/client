import { useParams } from 'react-router-dom';
import NavToggle from '../NavToggle';
import { useState } from 'react';
import PayStub from '../../pages/employee/PartTimeTab/PayStub';

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
    <>
      <div>{placeId}</div>
      <div>{id}</div>

      {/* 토글버튼 */}
      <NavToggle
        first='급여 명세서'
        second='근무 내역'
        firstSelected={() => setSelectedToggle(ToggleStatus.PAYMENT)}
        secondSelected={() => setSelectedToggle(ToggleStatus.WORKTIME)}
      />

      {/* 급여명세서 */}
      {selectedToggle === ToggleStatus.PAYMENT && (
        <PayStub year={today.getFullYear()} month={today.getMonth()} />
      )}
    </>
  );
};
export default WorkEmployeeDetail;
