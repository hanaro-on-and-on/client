import { useState, useEffect } from 'react';
import Frame from '../../components/Frame';
import NavToggle from '../../components/NavToggle';
import WhiteBox from '../../components/ui/WhiteBox';
import { formatMonths, styleMonths } from '../../utils/format-date';
import WorkPlaceName from '../../components/ui/WorkPlaceName';
import { FaAngleRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

type Payment = {
  name: string;
  payment: number;
};

const PaymentMain = () => {
  const [monthList, setMonthList] = useState<Date[]>([]);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<number>(0);
  const [paymentList, setPaymentList] = useState<Payment[]>([
    { name: '롯데리아', payment: 10000 },
  ]);
  const today = new Date();

  const navigation = useNavigate();

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
    <>
      <Frame navTitle='알바ON'>
        <div className='w-full flex flex-col  items-center gap-5 mt-7'>
          <NavToggle
            first='급여관리'
            second='근무 관리'
            firstSelected={() => {}}
            secondSelected={() => {}}
          />
          {/* 총 급여 */}
          <WhiteBox className='w-full py-5' border>
            <div>
              <select>
                {monthList.map((date) => (
                  <option
                    key={date.toISOString()}
                    value={date.toLocaleDateString()}
                    defaultChecked={date === today}
                  >
                    {`${styleMonths(formatMonths(date))} 총 급여`}
                  </option>
                ))}
              </select>
            </div>
            <div className='font-bold text-2xl pt-5'>
              {totalMonthlyPayment} 원
            </div>
          </WhiteBox>
          <div className='w-full'>
            {paymentList?.map((item) => {
              return (
                <WhiteBox
                  key={item.name}
                  border
                  className='w-full py-3'
                  onClick={() => navigation('/')}
                >
                  <div className='flex justify-between items-center'>
                    <WorkPlaceName name={item.name} colorType='01' />
                    <div className='flex items-center gap-1'>
                      {item.payment} <FaAngleRight />
                    </div>
                  </div>
                </WhiteBox>
              );
            })}
          </div>
        </div>
      </Frame>
    </>
  );
};

export default PaymentMain;
