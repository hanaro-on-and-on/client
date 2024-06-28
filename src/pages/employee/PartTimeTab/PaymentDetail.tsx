import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import ReturnArrow from '../../../components/ui/ReturnArrow';
import Frame from '../../../components/Frame';
import { formatMonths, styleMonths } from '../../../utils/format-date';
import BtnGray from '../../../components/BtnGray';
import Circle from '../../../components/ui/Circle';

const PaymentDetail = () => {
  const today = new Date();
  const { workPlace, dayMonth } = useParams();
  const [monthList, setMonthList] = useState<Date[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(today);
  const [paymentDay, setPaymentDate] = useState<Date>(new Date());

  useEffect(() => {
    const generateMonthList = (): Date[] => {
      const today = new Date();
      const months = [];
      for (let i = 0; i < 12; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        months.push(date);
      }
      return months;
    };

    setMonthList(generateMonthList());
  }, []);

  return (
    <Frame navTitle='알바ON'>
      <div className='w-full pt-3'>
        {workPlace && (
          <div className='flex flex-col gap-2'>
            <ReturnArrow text='목록' To='-1' />
            <WhiteBox className='py-3 px-3 w-full border '>
              <div className='flex justify-between items-center'>
                <WorkPlaceName name={workPlace} colorType='01' />
                <div className='flex gap-2'>
                  근무 시작일
                  <div>101010</div>
                </div>
              </div>
            </WhiteBox>
            <WhiteBox className='py-3 px-3 w-full border'>
              <select>
                {monthList.map((date) => (
                  <option
                    key={date.toISOString()}
                    value={date.toLocaleDateString()}
                    defaultChecked={date === today}
                    onSelect={() => setSelectedMonth(date)}
                  >
                    {`${styleMonths(formatMonths(date))} 예상 급여명세서`}
                  </option>
                ))}
              </select>
              <div className='flex justify-between items-end mt-5'>
                <div className='flex flex-col text-sm text-gray-300 text-start'>
                  <span>월급일</span>
                  <span>{paymentDay.toDateString()}</span>
                </div>
                <div className='text-xl font-bold'>총 1000원</div>
              </div>
              <BtnGray
                text='수령예정'
                action={() => {}}
                className='w-full my-2'
              />
              {/* 지급 합계 */}
              <div className='flex flex-col border-t border-gray-100 py-5'>
                <div className='text-start flex justify-between mb-3'>
                  <span className='font-bold'>지급 합계</span>
                  <span className='font-semibold'>1000원</span>
                </div>
                <div className='grid grid-cols-12 justify-between items-start'>
                  <div className='col-span-1'>
                    <Circle color='red' />
                  </div>
                  <div className='col-span-11 flex flex-col justify-start text-start pl-3'>
                    <div>근무수당</div>
                    <div className='flex justify-between  text-gray-400'>
                      <div>10,900원 * 10H </div>
                      <div>100,000원</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 공제 합계 */}
              <div className='flex flex-col border-t border-gray-100 py-5'>
                <div className='text-start flex justify-between mb-3'>
                  <span className='font-bold'>공제 합계</span>
                  <span className='font-semibold'>1000원</span>
                </div>
                <div className='grid grid-cols-12 justify-between items-start'>
                  <div className='col-span-1'>
                    <Circle color='blue' />
                  </div>
                  <div className='col-span-11 flex flex-col justify-start text-start pl-3'>
                    <div>근무수당</div>
                    <div className='flex justify-between text-gray-400'>
                      <div>10,900원 * 10H </div>
                      <div>100,000원</div>
                    </div>
                  </div>
                </div>
              </div>
            </WhiteBox>
          </div>
        )}
      </div>
    </Frame>
  );
};

export default PaymentDetail;
