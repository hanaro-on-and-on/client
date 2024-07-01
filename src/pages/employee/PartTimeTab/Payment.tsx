import { useNavigate } from 'react-router-dom';
import WhiteBox from '../../../components/ui/WhiteBox';
import { formatMonths, styleMonths } from '../../../utils/format-date';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import ApiClient from '../../../api/apiClient';

type Payment = {
  name: string;
  payment: number;
};

const Payment = () => {
  const today = new Date();
  const navigate = useNavigate();
  const [monthList, setMonthList] = useState<Date[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    today.getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<number>(0);
  const [paymentList, setPaymentList] = useState<
    EmployeeSalaryGetResponseList[]
  >([]);

  const fetchData = async (year: number, month: number) => {
    try {
      const response: MonthlyPayment =
        await ApiClient.getInstance().getMonthlyPayment(year, month);

      if (response) {
        setTotalMonthlyPayment(response.totalPayment);
        setPaymentList(response.employeeSalaryGetResponseList);
      }

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(selectedYear, selectedMonth);
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
  }, [selectedYear, selectedMonth]);

  return (
    <>
      {/* 총금액, 날짜 */}
      <WhiteBox className='w-full py-5' border>
        <div>
          <select
            value={`${selectedYear}-${selectedMonth}`}
            onChange={(e) => {
              const [year, month] = e.target.value.split('-');
              setSelectedYear(Number(year));
              setSelectedMonth(Number(month));
            }}
          >
            {monthList.map((date) => (
              <option
                key={date.toISOString()}
                value={`${date.getFullYear()}-${date.getMonth() + 1}`}
              >
                {`${styleMonths(formatMonths(date))} 총 급여`}
              </option>
            ))}
          </select>
        </div>
        <div className='font-bold text-2xl pt-5'>
          {totalMonthlyPayment.toLocaleString()} 원
        </div>
      </WhiteBox>
      <div className='w-full flex flex-col gap-1'>
        {/* 매장 목록 */}
        {paymentList
          ?.filter((item) => item.payment > 0)
          .map((item, index) => {
            return (
              <WhiteBox
                key={item.workPlaceName + String(index)}
                border
                className='w-full py-3'
              >
                <button
                  type='button'
                  onClick={() =>
                    navigate(
                      `detail/${selectedYear}-${selectedMonth}` +
                        `/${item.workPlaceName}`
                    )
                  }
                  className='flex justify-between items-center w-full bg-transparent'
                >
                  <WorkPlaceName
                    name={item.workPlaceName}
                    colorType={item.workPlaceColor}
                  />
                  <div className='flex items-center gap-1'>
                    {item.payment.toLocaleString()}
                    <FaAngleRight />
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
