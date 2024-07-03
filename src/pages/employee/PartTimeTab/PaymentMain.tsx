import Frame from '../../../components/Frame';
import NavToggle from '../../../components/NavToggle';

import { useNavigate } from 'react-router-dom';
import ToolBarLink from '../../../components/ui/ToolBarLink';
import { EmployeeMenuList } from '../datas';
import { useEffect, useState } from 'react';
import generateMonthList from '../../../utils/generateMonthList';
import Payment from './Payment';
import WorkTime from './WorkTime';

enum SELECTED_TAB {
  PAYMENT = 'payment',
  WORKTIME = 'worktime',
}

const PaymentMain = () => {
  const today = new Date();
  const [monthList, setMonthList] = useState<Date[]>(() => generateMonthList());
  const [selectedYearMonth, setSelectedYearMonth] = useState<Date>(today);

  const [selectedTab, setSelectedTab] = useState<SELECTED_TAB>(
    SELECTED_TAB.PAYMENT
  );

  const selectPayment = () => setSelectedTab(SELECTED_TAB.PAYMENT);
  const selectWorktime = () => setSelectedTab(SELECTED_TAB.WORKTIME);

  return (
    <>
      <Frame navTitle='알바ON'>
        <ToolBarLink options={EmployeeMenuList} />
        <div className='w-full flex flex-col  items-center gap-5 mt-7'>
          {/* 토글 버튼 */}
          <NavToggle
            first='급여관리'
            second='근무 관리'
            firstSelected={selectPayment}
            secondSelected={selectWorktime}
          />

          {selectedTab === SELECTED_TAB.PAYMENT && (
            <Payment
              monthList={monthList}
              selectedDate={selectedYearMonth}
              selectDate={setSelectedYearMonth}
            />
          )}
          {selectedTab === SELECTED_TAB.WORKTIME && <WorkTime />}
        </div>
      </Frame>
    </>
  );
};

export default PaymentMain;
