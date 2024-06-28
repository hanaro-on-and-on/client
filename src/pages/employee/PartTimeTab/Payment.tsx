import { useNavigate } from 'react-router-dom';
import WhiteBox from '../../../components/ui/WhiteBox';
import { formatMonths, styleMonths } from '../../../utils/format-date';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';

type Payment = {
  name: string;
  payment: number;
};

const Payment = () => {
  const today = new Date();
  const navigation = useNavigate();
  const [monthList, setMonthList] = useState<Date[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(today);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<number>(0);
  const [paymentList, setPaymentList] = useState<Payment[]>([
    { name: '롯데리아', payment: 10000 },
  ]);

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
      {/* 총금액, 날짜 */}
      <WhiteBox className='w-full py-5' border>
        <div>
          <select>
            {monthList.map((date) => (
              <option
                key={date.toISOString()}
                value={date.toLocaleDateString()}
                defaultChecked={date === today}
                onSelect={() => setSelectedMonth(date)}
              >
                {`${styleMonths(formatMonths(date))} 총 급여`}
              </option>
            ))}
          </select>
        </div>
        <div className='font-bold text-2xl pt-5'>{totalMonthlyPayment} 원</div>
      </WhiteBox>
      <div className='w-full'>
        {/* 매장 목록 */}
        {paymentList?.map((item) => {
          return (
            <WhiteBox key={item.name} border className='w-full py-3'>
              <button
                type='button'
                onClick={() =>
                  navigation(
                    `detail/${selectedMonth?.getFullYear()}-${selectedMonth?.getMonth() + 1}` +
                      `/${item.name}`
                  )
                }
                className='flex justify-between items-center w-full bg-transparent'
              >
                <WorkPlaceName name={item.name} colorType='01' />
                <div className='flex items-center gap-1'>
                  {item.payment} <FaAngleRight />
                </div>
              </button>
            </WhiteBox>
          );
        })}
      </div>
    </>
  );
};

export default Payment;
