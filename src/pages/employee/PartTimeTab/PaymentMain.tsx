import Frame from '../../../components/Frame';
import NavToggle from '../../../components/NavToggle';

import { useEffect, useState } from 'react';
import generateMonthList from '../../../utils/generateMonthList';
import Payment from './Payment';
import WorkTime from './WorkTime';
import { useDate } from '../../../contexts/Date-Context';
import { useLocation } from 'react-router-dom';

export enum SELECTED_TAB {
  PAYMENT = '급여관리',
  WORKTIME = '근무지 관리',
}

const PaymentMain = () => {
  const today = new Date();
  const [monthList, setMonthList] = useState<Date[]>(() => generateMonthList());
  const { setYearMonth } = useDate();

  const [selectedTab, setSelectedTab] = useState<SELECTED_TAB>(
    SELECTED_TAB.PAYMENT
  );

  const location = useLocation();
  const { passedSelectedTab } = location.state || {};

  const selectPayment = () => setSelectedTab(SELECTED_TAB.PAYMENT);
  const selectWorktime = () => setSelectedTab(SELECTED_TAB.WORKTIME);

  useEffect(() => {
    console.log('state', passedSelectedTab);
    if (passedSelectedTab) setSelectedTab(passedSelectedTab);
  }, [passedSelectedTab]);

  return (
    <>
      <Frame navTitle='알바ON' toolBar footer>
        <div className='w-full flex flex-col  items-center gap-5 '>
          {/* 토글 버튼 */}
          <NavToggle
            selectedTab={selectedTab}
            first='급여관리'
            second='근무지 관리'
            firstSelected={() => {
              selectPayment();
              setYearMonth(today);
            }}
            secondSelected={selectWorktime}
          />

          {selectedTab === SELECTED_TAB.PAYMENT && (
            <Payment monthList={monthList} />
          )}
          {selectedTab === SELECTED_TAB.WORKTIME && <WorkTime />}
        </div>
      </Frame>
    </>
  );
};

export default PaymentMain;
