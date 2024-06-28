import Frame from '../../components/Frame';
import NavToggle from '../../components/NavToggle';

import { Outlet, useNavigate } from 'react-router-dom';

const PaymentMain = () => {
  const navigation = useNavigate();
  return (
    <>
      <Frame navTitle='알바ON'>
        <div className='w-full flex flex-col  items-center gap-5 mt-7'>
          <NavToggle
            first='급여관리'
            second='근무 관리'
            firstSelected={() => {
              navigation('/part-time/payment');
            }}
            secondSelected={() => {
              navigation('/part-time/worktime');
            }}
          />
          <Outlet />
        </div>
      </Frame>
    </>
  );
};

export default PaymentMain;
