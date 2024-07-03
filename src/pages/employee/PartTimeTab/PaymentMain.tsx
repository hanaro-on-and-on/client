import Frame from '../../../components/Frame';
import NavToggle from '../../../components/NavToggle';

import { Outlet, useNavigate } from 'react-router-dom';
import ToolBarLink from '../../../components/ui/ToolBarLink';
import { EmployeeMenuList } from '../datas';

const PaymentMain = () => {
  const navigation = useNavigate();
  return (
    <>
      <Frame navTitle='알바ON'>
        <ToolBarLink options={EmployeeMenuList} />
        <div className='w-full flex flex-col  items-center gap-5 mt-7'>
          {/* 토글 버튼 */}
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
