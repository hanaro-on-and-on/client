import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import ReturnArrow from '../../../components/ui/ReturnArrow';
import Frame from '../../../components/Frame';

import NavToggle from '../../../components/NavToggle';
import PayStub from './PayStub';
import generateMonthList from '../../../utils/generateMonthList';

const PaymentDetail = () => {
  const today = new Date();
  const { workPlace, dayMonth } = useParams();
  const [monthList, setMonthList] = useState<Date[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(today);

  useEffect(() => {
    setMonthList(generateMonthList());
  }, []);

  return (
    <Frame navTitle='알바ON'>
      <div className='w-full pt-3'>
        {workPlace && (
          <div className='flex flex-col gap-2'>
            {/* 뒤로 가기 */}
            <ReturnArrow text='목록' To='-1' />

            {/* 매장명 */}
            <WhiteBox className='py-3 px-3 w-full border '>
              <div className='flex justify-between items-center'>
                <WorkPlaceName name={workPlace} colorType='01' />
                <div className='flex gap-2'>
                  근무 시작일
                  <div>101010</div>
                </div>
              </div>
            </WhiteBox>

            {/* 토글버튼 */}
            <NavToggle
              first='급여 명세서'
              second='근무 내역'
              firstSelected={() => {}}
              secondSelected={() => {}}
            />

            {/* 급여명세서 */}
            <PayStub
              year={selectedMonth.getFullYear()}
              month={selectedMonth.getMonth()}
            />
          </div>
        )}
      </div>
    </Frame>
  );
};

export default PaymentDetail;
